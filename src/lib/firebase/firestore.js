const updateWithRating = async (
	transaction,
	docRef,
	newRatingDocument,
	review
) => {
	const restaurant = await transaction.get(docRef);
	const data = restaurant.data();
	const newNumRatings = data?.numRatings ? data.numRatings + 1 : 1;
	const newSumRating = (data?.sumRating || 0) + Number(review.rating);
	const newAverage = newSumRating / newNumRatings;

	transaction.update(docRef, {
		numRatings: newNumRatings,
		sumRating: newSumRating,
		avgRating: newAverage,
	});

	transaction.set(newRatingDocument, {
		...review,
		timestamp: Timestamp.fromDate(new Date()),
	});
};

export async function addReviewToRestaurant(db, restaurantId, review) {
	if (!restaurantId) {
		throw new Error("No restaurant ID was provided.");
	}

	if (!review) {
		throw new Error("A valid review has not been provided.");
	}

	try {
		const docRef = doc(collection(db, "restaurants"), restaurantId);
		const newRatingDocument = doc(
			collection(db, `restaurants/${restaurantId}/ratings`)
		);

		await runTransaction(db, (transaction) =>
			updateWithRating(transaction, docRef, newRatingDocument, review)
		);
	} catch (error) {
		console.error(
			"There was an error adding the rating to the restaurant.",
			error
		);
		throw error;
	}
}
