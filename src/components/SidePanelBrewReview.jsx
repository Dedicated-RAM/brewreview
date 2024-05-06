import { useEffect, useState } from "react";
import moment from "moment";

import { RxAvatar } from "react-icons/rx";
import SidePanelBrewForm from "../components/SidePanelBrewForm";

import { getCafeReviews, getCafeByPlaceId } from "../lib/firebase/firestore";

export default function SidePanelBrewReview({ place, hideForm }) {
  let [reviews, setReviews] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (place) {
      (async () => {
        setLoading(true);
        let cafePlace = await getCafeByPlaceId(place.place_id);
        if (cafePlace) {
          let cafeReviews = await getCafeReviews(cafePlace.id);
          setReviews(cafeReviews);
        }
        setLoading(false);
      })();
    }
  }, [place]);

  if (!place || Object.keys(place).length <= 0 || loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      {/* {!place.hideForm && <SidePanelBrewForm />} */}
      {!hideForm && <SidePanelBrewForm place={place} reviews={reviews} />}

      {(!reviews || reviews.length == 0) && (
        <div className="m-3 p-3 bg-accent-2 rounded-xl">No reviews yet!</div>
      )}
      {reviews &&
        reviews.length > 0 &&
        reviews.map((review, index) => {
          return (
            <div className="m-3 p-3 bg-accent-2 rounded-xl" key={index}>
              <div className="flex items-center">
                {false && (
                  <img
                    alt="Jefferson's Coffee Shop"
                    className="w-10 h-10 overflow-hidden rounded-full"
                    src="/jeffersonscoffee.jpg"
                  />
                )}
                <span className="pl-2 font-semibold text-base">
                  {review.user_id}
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <span className="text-accent-4 text-sm">
                  {review.overall_rating}
                </span>
                <span className="text-accent-4 text-lg">
                  {"★".repeat(Math.floor(review.overall_rating))}
                </span>
                <span className="text-sm text-accent-4">
                  {moment.unix(review.updated_at.seconds).fromNow()}
                </span>
              </div>
              <p className="text-sm">{review.word_review}</p>
              <div className="mt-3 text-sm">
                <p className="">Seats: {review.number_of_seats}</p>
                <p className="">Wifi: {review.wifi ? "Yes" : "No"}</p>
                <p className="">Outlets: {review.outlet_rating}</p>
                <p className="">Noise: {review.noise_level}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}
