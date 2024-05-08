"use server";

import { addReview } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/firebase";
import { getFirestore } from "firebase/firestore";

export async function handleReviewFormSubmission(data) {
    const { app } = await getAuthenticatedAppForUser();
    const db = getFirestore(app);

    //TODO: validate data?

    await addReview(db, data.get("place_id"), {
        overall_rating: data.get("overall_rating"),
        number_of_seats: data.get("number_of_seats"),
        outlet_rating: data.get("outlet_rating"),
        word_review: data.get("word_review"),
        wifi: data.get("wifi"),
        user_id: data.get("user_id"),
    });
}

// This is a next.js server action, an alpha feature, so
// use with caution
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
// export async function handleReviewFormSubmission(data) {
// 	const { app } = await getAuthenticatedAppForUser();
// 	const db = getFirestore(app);

// 	await addReviewToRestaurant(db, data.get("restaurantId"), {
// 		text: data.get("text"),
// 		rating: data.get("rating"),

// 		// This came from a hidden form field
// 		userId: data.get("userId"),
// 	});
// }
