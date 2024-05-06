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
  setDoc,
  getFirestore,
} from "firebase/firestore";

import { db } from "./FirebaseConfig";

/**
 * Adds a review to a cafe
 * @param {Object} db		The Firestore database object
 * @param {String} cafeId	The ID of the cafe to add the review to
 * @param {Object} review	The review object to add to the cafe
 */
export async function addReview(place_id, review) {
  // check if cafe exists in db
  var cafe = await getCafeByPlaceId(place_id);
  // if cafe does not exist, add it to db
  if (!cafe) cafe = await addCafe(db, place_id);

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
