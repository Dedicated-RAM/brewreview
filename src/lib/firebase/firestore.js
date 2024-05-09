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
import { add } from "lodash";
import moment from "moment";

const rateLimitStore = {};

const MAX_REQUESTS = 50;
const RATE_LIMIT_TIME = 1000 * 60 * 15; // 15 minutes
const DEBUG = true;

function printRateLimitStore() {
    console.log(rateLimitStore);
}

/**
 * Adds a review to a cafe
 * @param {Object} db		The Firestore database object
 * @param {String} cafeId	The ID of the cafe to add the review to
 * @param {Object} review	The review object to add to the cafe
 */
export async function addReview(place_id, review) {
    // Check rate limit
    const currentTime = Date.now();
    const userRequests = rateLimitStore["addReview"] || [];
    const requestsInWindow = userRequests.filter(
        (time) => currentTime - time < RATE_LIMIT_TIME
    );
    rateLimitStore["addReview"] = requestsInWindow;

    if (requestsInWindow.length >= MAX_REQUESTS) {
        throw new Error("addReview: Rate limit exceeded");
    }

    // Add current request to store
    rateLimitStore["addReview"].push(currentTime);

    // check if cafe exists in db
    var cafe = await getCafeByPlaceId(place_id);
    // if cafe does not exist, add it to db
    if (!cafe) cafe = await addCafe(db, place_id);
    if (DEBUG) printRateLimitStore();

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
    // Check rate limit
    const currentTime = Date.now();
    const userRequests = rateLimitStore["editReview"] || [];
    const requestsInWindow = userRequests.filter(
        (time) => currentTime - time < RATE_LIMIT_TIME
    );
    rateLimitStore["editReview"] = requestsInWindow;

    if (requestsInWindow.length >= MAX_REQUESTS) {
        throw new Error("editReview: Rate limit exceeded");
    }

    // Add current request to store
    rateLimitStore["editReview"].push(currentTime);
    if (DEBUG) printRateLimitStore();

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
    // Check rate limit
    const currentTime = Date.now();
    const userRequests = rateLimitStore["getCafeReviews"] || [];
    const requestsInWindow = userRequests.filter(
        (time) => currentTime - time < RATE_LIMIT_TIME
    );
    rateLimitStore["getCafeReviews"] = requestsInWindow;

    if (requestsInWindow.length >= MAX_REQUESTS) {
        throw new Error("getCafeReviews: Rate limit exceeded");
    }

    // Add current request to store
    rateLimitStore["getCafeReviews"].push(currentTime);
    if (DEBUG) printRateLimitStore();

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
    // Check rate limit
    const currentTime = Date.now();
    const userRequests = rateLimitStore["addCafe"] || [];
    const requestsInWindow = userRequests.filter(
        (time) => currentTime - time < RATE_LIMIT_TIME
    );
    rateLimitStore["addCafe"] = requestsInWindow;

    if (requestsInWindow.length >= MAX_REQUESTS) {
        throw new Error("addCafe: Rate limit exceeded");
    }

    // Add current request to store
    rateLimitStore["addCafe"].push(currentTime);
    if (DEBUG) printRateLimitStore();

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
    // Check rate limit
    const currentTime = Date.now();
    const userRequests = rateLimitStore["getCafeByPlaceId"] || [];
    const requestsInWindow = userRequests.filter(
        (time) => currentTime - time < RATE_LIMIT_TIME
    );
    rateLimitStore["getCafeByPlaceId"] = requestsInWindow;

    if (requestsInWindow.length >= MAX_REQUESTS) {
        throw new Error("getCafeByPlaceId: Rate limit exceeded");
    }

    // Add current request to store
    rateLimitStore["getCafeByPlaceId"].push(currentTime);
    if (DEBUG) printRateLimitStore();

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

export async function getCafe(cafeId) {
    // Check rate limit

    const currentTime = Date.now();
    const userRequests = rateLimitStore["getCafe"] || [];
    const requestsInWindow = userRequests.filter(
        (time) => currentTime - time < RATE_LIMIT_TIME
    );
    rateLimitStore["getCafe"] = requestsInWindow;

    if (requestsInWindow.length >= MAX_REQUESTS) {
        throw new Error("getCafe: Rate limit exceeded");
    }

    // Add current request to store
    rateLimitStore["getCafe"].push(currentTime);
    if (DEBUG) printRateLimitStore();

    const docRef = doc(db, "cafes", cafeId);
    const docSnap = await getDoc(docRef);
    return {
        id: docSnap.id,
        ...docSnap.data(),
    };
}

/**
 * Gets a group by its ID
 * @param {String} groupId	The ID of the group to get
 * @returns {Object}	The group object
 */
export async function getGroupById(groupId) {
    // Check rate limit
    const currentTime = Date.now();
    const userRequests = rateLimitStore["getGroupById"] || [];
    const requestsInWindow = userRequests.filter(
        (time) => currentTime - time < RATE_LIMIT_TIME
    );
    rateLimitStore["getGroupById"] = requestsInWindow;

    if (requestsInWindow.length >= MAX_REQUESTS) {
        throw new Error("getGroupById: Rate limit exceeded");
    }

    // Add current request to store
    rateLimitStore["getGroupById"].push(currentTime);
    if (DEBUG) printRateLimitStore();

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
    // Check rate limit
    const currentTime = Date.now();
    const userRequests = rateLimitStore["getGroups"] || [];
    const requestsInWindow = userRequests.filter(
        (time) => currentTime - time < RATE_LIMIT_TIME
    );
    rateLimitStore["getGroups"] = requestsInWindow;

    if (requestsInWindow.length >= MAX_REQUESTS) {
        throw new Error("getGroups: Rate limit exceeded");
    }

    // Add current request to store
    rateLimitStore["getGroups"].push(currentTime);
    if (DEBUG) printRateLimitStore();

    const q = query(collection(db, "groups"));
    const results = await getDocs(q);

    return results.docs
        .filter((doc) => {
            return moment(`${doc.data().date} ${doc.data().time}`).isAfter(
                moment()
            );
        })
        .map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
}

/**
 * Adds a group to the database
 * @param {Object} db		The Firestore database object
 * @param {String} name	The name of the group
 * @param {String} description	The description of the group
 */

export async function addGroup(group) {
    // Check rate limit
    const currentTime = Date.now();
    const userRequests = rateLimitStore["addGroup"] || [];
    const requestsInWindow = userRequests.filter(
        (time) => currentTime - time < RATE_LIMIT_TIME
    );
    rateLimitStore["addGroup"] = requestsInWindow;

    if (requestsInWindow.length >= MAX_REQUESTS) {
        throw new Error("addGroup: Rate limit exceeded");
    }

    // Add current request to store
    rateLimitStore["addGroup"].push(currentTime);
    if (DEBUG) printRateLimitStore();

    await addDoc(collection(db, "groups"), group);
}

export async function editGroup(groupId, group) {
    const groupRef = doc(db, "groups", groupId);

    await updateDoc(groupRef, group);
}
