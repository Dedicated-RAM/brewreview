import { useEffect } from "react";

import Image from "next/image";

export default function SidePanelGoogleReview({ place }) {
  useEffect(() => {}, [place]);

  if (!place || Object.keys(place).length <= 0)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="">
      {place?.reviews.map((review, index) => {
        return (
          <div className="m-3 p-3 bg-accent-2 rounded-xl" key={index}>
            <div className="flex items-center">
              <img
                alt="Reviewer Profile Picture"
                className="w-10 h-10 overflow-hidden rounded-full"
                src={review?.profile_photo_url}
              />
              <span className="pl-2 font-semibold text-base">
                {review?.author_name}
              </span>
            </div>
            <div className="flex space-x-2 items-center">
              <span className="text-accent-4 text-sm">
                {review?.rating} stars
              </span>
              <span className="text-accent-4 text-lg">
                {"★".repeat(Math.floor(review?.rating))}
              </span>
              <span className="text-sm text-accent-4">
                {review?.relative_time_description}
              </span>
            </div>
            <p className="text-sm">{review?.text}</p>
          </div>
        );
      })}
    </div>
  );
}
