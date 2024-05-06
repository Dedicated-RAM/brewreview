import { useEffect, useState } from "react";

export default function SidePanelBrewForm({ place, reviews }) {
  let [stats, setStats] = useState({});

  let noiseLevels = ["Very Quiet", "Quiet", "Medium", "Loud", "Very Loud"];
  let noiseLevels_inverse = {
    "Very Quiet": 1,
    Quiet: 2,
    Medium: 3,
    Loud: 4,
    "Very Loud": 5,
  };

  useEffect(() => {
    let cafeStats = {
      number_of_seats: 0,
      outlet_rating: 0,
      wifi: 0,
      noise_rating: 0,
      overall_rating: 0,
      num: 0,
    };

    //do some maeth
    if (reviews && reviews.length > 0) {
      reviews.forEach((review) => {
        cafeStats.number_of_seats += review.number_of_seats;
        cafeStats.outlet_rating += review.outlet_rating;
        cafeStats.wifi += review.wifi ? 1 : 0;
        cafeStats.noise_rating += noiseLevels_inverse[review.noise_level];
        cafeStats.overall_rating += review.overall_rating;
        cafeStats.num++;
      });
    }

    if (cafeStats.num == 0)
      cafeStats = {
        number_of_seats: "N/A",
        outlet_rating: "N/A",
        wifi: "N/A",
        noise_rating: "N/A",
        overall_rating: "N/A",
        num: 0,
      };
    else {
      cafeStats = {
        number_of_seats: `~${Math.round((cafeStats.number_of_seats / cafeStats.num) * 100) / 100}`,
        outlet_rating:
          Math.round((cafeStats.outlet_rating / cafeStats.num) * 100) / 100,
        wifi: `${Math.round((cafeStats.wifi / cafeStats.num) * 100)}% certainty`,
        noise_rating:
          cafeStats.noise_rating / cafeStats.num ==
          Math.round(cafeStats.noise_rating / cafeStats.num)
            ? noiseLevels[cafeStats.noise_rating / cafeStats.num - 1]
            : `${noiseLevels[Math.floor(cafeStats.noise_rating / cafeStats.num) - 1]} - ${noiseLevels[Math.ceil(cafeStats.noise_rating / cafeStats.num) - 1]}`,
        overall_rating:
          Math.round((cafeStats.overall_rating / cafeStats.num) * 100) / 100,
      };
    }

    setStats(cafeStats);
  }, [place, reviews]);

  if (!place || Object.keys(place).length <= 0 || !reviews || !stats)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="bg-accent-3 m-3 rounded-xl">
      <div className="flex py-6 px-8 container justify-between">
        <div className="text-base">
          <p className="">Seats: {stats.number_of_seats}</p>
          <p className="">Wifi: {stats.wifi}</p>
          <p className="">Outlets: {stats.outlet_rating}</p>
          <p className="">Noise: {stats.noise_rating}</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="text-3xl">{stats.overall_rating}</p>
          <div className="text-xl">
            {"★".repeat(Math.floor(stats.overall_rating))}
          </div>
          <p className="">{stats.num} reviews</p>
        </div>
      </div>
      <div className="flex justify-center items-center pb-3">
        <button
          className="py-2 px-4 rounded rounded-xl bg-accent-5 text-accent-1"
          onClick={() => (window.location.href = `/${place.place_id}/review`)}
        >
          Leave a review
        </button>
      </div>
    </div>
  );
}
