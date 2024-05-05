/* Database Schema

cafe collection
{
	maps_place_id: string

	cafes/{cafe_id}/reviews collection
	{
		cafe: reference to a cafe document (ex. /cafes/abc)
		user_id: string
		outlet_score: number
		number_of_seats: number
		overall_rating: number
		overall_review: string
		wifi: boolean
		created_at: timestamp
		updated_at: timestamp
	}
}

groups collection
{
	name: string
	description: string
	max_count: number
	members: array of user ids
	location: reference to a cafe document (ex. /cafes/abc)
}

*/

import { generateFakeRestaurantsAndReviews } from "@/src/lib/fakeRestaurants.js";

import {
	collection,
	onSnapshot,
	query,
	getDocs,
	doc,
	getDoc,
	updateDoc,
	orderBy,
	Timestamp,
	runTransaction,
	where,
	addDoc,
} from "firebase/firestore";

import { db } from "@/src/lib/firebase/firebase";

/**
 * Adds a review to a cafe
 * @param {Object} db		The Firestore database object
 * @param {String} cafeId	The ID of the cafe to add the review to
 * @param {Object} review	The review object to add to the cafe
 */
export async function addReview(db, place_id, review) {
	// check if cafe exists in db
	var cafe = await getCafeByPlaceId(place_id);
	// if cafe does not exist, add it to db
	if (!cafe) {
		cafe = await addCafe(db, place_id);
	}
	if (!cafe) {
		//TODO: handle error
		return;
	}

	const cafeId = cafe.id;
	const cafeRef = doc(db, "cafes", cafeId);
	const reviewsRef = collection(cafeRef, "reviews");

	const reviewData = {
		...review,
		created_at: Timestamp.now(),
		updated_at: Timestamp.now(),
	};

	await addDoc(reviewsRef, reviewData);
}

/**
 * Edits a review for a cafe
 * @param {Object} db		The Firestore database object
 * @param {String} cafeId	The ID of the cafe to edit the review for
 * @param {String} reviewId	The ID of the review to edit
 * @param {Object} review	The review object to update the review with
 */
export async function editReview(db, cafeId, reviewId, review) {
	const cafeRef = doc(db, "cafes", cafeId);
	const reviewRef = doc(collection(cafeRef, "reviews"), reviewId);

	const reviewData = {
		...review,
		updated_at: Timestamp.now(),
	};

	await updateDoc(reviewRef, reviewData);
}

/**
 * Gets all reviews for a cafe
 * @param {String} cafeId	The ID of the cafe to get reviews for
 * @returns {Array}	An array of reviews for the cafe ordered by newest first
 */
export async function getCafeReviews(cafeId) {
	const cafeRef = doc(db, "cafes", cafeId);
	const reviewsRef = collection(cafeRef, "reviews");

	const q = query(reviewsRef, orderBy("updated_at", "desc"));
	const results = await getDocs(q);

	return results.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
}

/**
 * Adds a cafe to the database
 * @param {Object} db		The Firestore database object
 * @param {String} place_id	The Google Maps place ID for the cafe
 * @returns {Object}	The cafe object
 */
async function addCafe(db, place_id) {
	const cafeRef = collection(db, "cafes");
	const cafeData = {
		maps_place_id: place_id,
	};
	// add the cafe to the database
	const docRef = await addDoc(cafeRef, cafeData);
	// return the cafe object
	return {
		id: docRef.id,
		...cafeData,
	};
}

/**
 * Gets a cafe by its Google Maps place ID
 * @param {String} place_id	The Google Maps place ID for the cafe
 * @returns {Object}	The cafe object
 * @returns {null}	If the cafe does not exist
 */
export async function getCafeByPlaceId(place_id) {
	const q = query(
		collection(db, "cafes"),
		where("maps_place_id", "==", place_id)
	);
	const results = await getDocs(q);

	if (results.empty) {
		return null;
	}

	const doc = results.docs[0];
	return {
		id: doc.id,
		...doc.data(),
	};
}

/**
 * Gets a group by its ID
 * @param {String} groupId	The ID of the group to get
 * @returns {Object}	The group object
 */
export async function getGroupById(groupId) {
	const docRef = doc(db, "groups", groupId);
	const docSnap = await getDoc(docRef);
	return {
		id: docSnap.id,
		...docSnap.data(),
	};
}

/**
 * Gets all groups
 * @returns {Array}	An array of all groups
 */
export async function getGroups() {
	const q = query(collection(db, "groups"));
	const results = await getDocs(q);

	return results.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
}

/**
 * Adds a group to the database
 * @param {Object} db		The Firestore database object
 * @param {Object} group	The group object to add to the database
 * @returns {Object}	The group object
 */
export async function addGroup(db, group) {
	const groupRef = collection(db, "groups");
	const groupData = {
		...group,
	};
	const docRef = await addDoc(groupRef, groupData);
	return {
		id: docRef.id,
		...groupData,
	};
}

/**
 * Edits a group in the database
 * @param {Object} db		The Firestore database object
 * @param {String} groupId	The ID of the group to edit
 * @param {Object} group	The group object to update the group with
 * @returns {Object}	The group object
 */
export async function editGroup(db, groupId, group) {
	const groupRef = doc(db, "groups", groupId);
	const groupData = {
		...group,
	};
	await updateDoc(groupRef, groupData);
	return {
		id: groupId,
		...groupData,
	};
}

/*






*/

//* EXAMPLE FUNCTIONS
// export async function updateRestaurantImageReference(
// 	restaurantId,
// 	publicImageUrl
// ) {
// 	const restaurantRef = doc(collection(db, "restaurants"), restaurantId);
// 	if (restaurantRef) {
// 		await updateDoc(restaurantRef, { photo: publicImageUrl });
// 	}
// }

// const updateWithRating = async (
// 	transaction,
// 	docRef,
// 	newRatingDocument,
// 	review
// ) => {
// 	const restaurant = await transaction.get(docRef);
// 	const data = restaurant.data();
// 	const newNumRatings = data?.numRatings ? data.numRatings + 1 : 1;
// 	const newSumRating = (data?.sumRating || 0) + Number(review.rating);
// 	const newAverage = newSumRating / newNumRatings;

// 	transaction.update(docRef, {
// 		numRatings: newNumRatings,
// 		sumRating: newSumRating,
// 		avgRating: newAverage,
// 	});

// 	transaction.set(newRatingDocument, {
// 		...review,
// 		timestamp: Timestamp.fromDate(new Date()),
// 	});
// };

// //* DB is the Firestore database instance
// //* it is obtained from calling a auth.js function that returns an
// export async function addReviewToRestaurant(db, restaurantId, review) {
// 	if (!restaurantId) {
// 		throw new Error("No restaurant ID has been provided.");
// 	}

// 	if (!review) {
// 		throw new Error("A valid review has not been provided.");
// 	}

// 	try {
// 		const docRef = doc(collection(db, "restaurants"), restaurantId);
// 		const newRatingDocument = doc(
// 			collection(db, `restaurants/${restaurantId}/ratings`)
// 		);

// 		// corrected line
// 		await runTransaction(db, (transaction) =>
// 			updateWithRating(transaction, docRef, newRatingDocument, review)
// 		);
// 	} catch (error) {
// 		console.error(
// 			"There was an error adding the rating to the restaurant",
// 			error
// 		);
// 		throw error;
// 	}
// }

// function applyQueryFilters(q, { category, city, price, sort }) {
// 	if (category) {
// 		q = query(q, where("category", "==", category));
// 	}
// 	if (city) {
// 		q = query(q, where("city", "==", city));
// 	}
// 	if (price) {
// 		q = query(q, where("price", "==", price.length));
// 	}
// 	if (sort === "Rating" || !sort) {
// 		q = query(q, orderBy("avgRating", "desc"));
// 	} else if (sort === "Review") {
// 		q = query(q, orderBy("numRatings", "desc"));
// 	}
// 	return q;
// }

// export async function getRestaurants(filters = {}) {
// 	let q = query(collection(db, "restaurants"));

// 	q = applyQueryFilters(q, filters);
// 	const results = await getDocs(q);
// 	return results.docs.map((doc) => {
// 		return {
// 			id: doc.id,
// 			...doc.data(),
// 			// Only plain objects can be passed to Client Components from Server Components
// 			timestamp: doc.data().timestamp.toDate(),
// 		};
// 	});
// }

// export function getRestaurantsSnapshot(cb, filters = {}) {
// 	if (typeof cb !== "function") {
// 		console.log("Error: The callback parameter is not a function");
// 		return;
// 	}

// 	let q = query(collection(db, "restaurants"));
// 	q = applyQueryFilters(q, filters);

// 	const unsubscribe = onSnapshot(q, (querySnapshot) => {
// 		const results = querySnapshot.docs.map((doc) => {
// 			return {
// 				id: doc.id,
// 				...doc.data(),
// 				// Only plain objects can be passed to Client Components from Server Components
// 				timestamp: doc.data().timestamp.toDate(),
// 			};
// 		});

// 		cb(results);
// 	});

// 	return unsubscribe;
// }

// export async function getRestaurantById(restaurantId) {
// 	if (!restaurantId) {
// 		console.log("Error: Invalid ID received: ", restaurantId);
// 		return;
// 	}
// 	const docRef = doc(db, "restaurants", restaurantId);
// 	const docSnap = await getDoc(docRef);
// 	return {
// 		...docSnap.data(),
// 		timestamp: docSnap.data().timestamp.toDate(),
// 	};
// }

// export function getRestaurantSnapshotById(restaurantId, cb) {
// 	if (!restaurantId) {
// 		console.log("Error: Invalid ID received: ", restaurantId);
// 		return;
// 	}

// 	if (typeof cb !== "function") {
// 		console.log("Error: The callback parameter is not a function");
// 		return;
// 	}

// 	const docRef = doc(db, "restaurants", restaurantId);
// 	const unsubscribe = onSnapshot(docRef, (docSnap) => {
// 		cb({
// 			...docSnap.data(),
// 			timestamp: docSnap.data().timestamp.toDate(),
// 		});
// 	});
// 	return unsubscribe;
// }

// export async function getReviewsByRestaurantId(restaurantId) {
// 	if (!restaurantId) {
// 		console.log("Error: Invalid restaurantId received: ", restaurantId);
// 		return;
// 	}

// 	const q = query(
// 		collection(db, "restaurants", restaurantId, "ratings"),
// 		orderBy("timestamp", "desc")
// 	);

// 	const results = await getDocs(q);
// 	return results.docs.map((doc) => {
// 		return {
// 			id: doc.id,
// 			...doc.data(),
// 			// Only plain objects can be passed to Client Components from Server Components
// 			timestamp: doc.data().timestamp.toDate(),
// 		};
// 	});
// }

// export function getReviewsSnapshotByRestaurantId(restaurantId, cb) {
// 	if (!restaurantId) {
// 		console.log("Error: Invalid restaurantId received: ", restaurantId);
// 		return;
// 	}

// 	const q = query(
// 		collection(db, "restaurants", restaurantId, "ratings"),
// 		orderBy("timestamp", "desc")
// 	);
// 	const unsubscribe = onSnapshot(q, (querySnapshot) => {
// 		const results = querySnapshot.docs.map((doc) => {
// 			return {
// 				id: doc.id,
// 				...doc.data(),
// 				// Only plain objects can be passed to Client Components from Server Components
// 				timestamp: doc.data().timestamp.toDate(),
// 			};
// 		});
// 		cb(results);
// 	});
// 	return unsubscribe;
// }

// export async function addFakeRestaurantsAndReviews() {
// 	const data = await generateFakeRestaurantsAndReviews();
// 	for (const { restaurantData, ratingsData } of data) {
// 		try {
// 			const docRef = await addDoc(
// 				collection(db, "restaurants"),
// 				restaurantData
// 			);

// 			for (const ratingData of ratingsData) {
// 				await addDoc(
// 					collection(db, "restaurants", docRef.id, "ratings"),
// 					ratingData
// 				);
// 			}
// 		} catch (e) {
// 			console.log("There was an error adding the document");
// 			console.error("Error adding document: ", e);
// 		}
// 	}
// }
