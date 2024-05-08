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
                <img
                  alt="Jefferson's Coffee Shop"
                  className="w-8 h-8 overflow-hidden rounded-full"
                  src="/jeffersonscoffee.jpg"
                />
                <span className="pl-2 font-semibold text-base">
                  {review.user_display_name}
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <span className="text-accent-4 text-sm">
                  {review.overall_rating} stars
                </span>
                <span className="text-accent-4 text-lg">
                  {"★".repeat(Math.floor(review.overall_rating))}
                </span>
                <span className="text-sm text-accent-4">
                  {moment.unix(review.updated_at.seconds).fromNow()}
                </span>
              </div>
              <p className="text-sm">{review.word_review}</p>
              <div className="text-sm">
                <div className="flex items-center">
                  <p className="">Seats:</p>
                  <span className="text-accent-4 text-lg">
                    {"★".repeat(Math.floor(review.number_of_seats))}
                  </span>
                </div>
                <p className="">Wifi: {review.wifi ? "Yes" : "No"}</p>
                <div className="flex items-center">
                  <p className="">Outlets:</p>
                  <span className="text-accent-4 text-lg">
                    {"★".repeat(Math.floor(review.outlet_rating))}
                  </span>
                </div>
                <p className="">Noise: {review.noise_level}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}
