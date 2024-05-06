import { useEffect } from "react";

import { RxAvatar } from "react-icons/rx";
import SidePanelBrewForm from "../components/SidePanelBrewForm";
export default function SidePanelBrewReview({ place }) {

  useEffect(() => { }, [place]);

  if (!place || Object.keys(place).length <= 0) return (<div><p>Loading...</p></div>);
  return (
    <>
      {/* {!place.hideForm && <SidePanelBrewForm />} */}
      <SidePanelBrewForm place={place} />
      <div className="m-3 p-3 bg-accent-2 rounded-xl">
        <div className="flex items-center">
          <img
            alt="Jefferson's Coffee Shop"
            className="w-10 h-10 overflow-hidden rounded-full"
            src="/jeffersonscoffee.jpg"
          />
          <span className="pl-2 font-semibold text-base">Bryan Chan</span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-accent-4 text-lg">★★★★★</span>
          <span className="text-sm text-accent-4">2 months ago</span>
        </div>
        <p className="text-sm">
          This was the best coffee shop I’ve ever been!!!! I love this place
          more than cats
        </p>
        <div className="mt-3 text-sm">
          <p className="">Seats: 5</p>
          <p className="">Wifi: Yes</p>
          <p className="">Outlets: 5</p>
          <p className="">Noise: Low</p>
        </div>
      </div>
    </>
  );
}
