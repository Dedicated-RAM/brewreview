import { useEffect } from 'react';

export default function SidePanelBrewForm({ place }) {

  useEffect(() => { }, [place]);

  if (!place || Object.keys(place).length <= 0) return (<div><p>Loading...</p></div>);

  return (
    <div className="bg-accent-3 m-3 rounded-xl">
      <div className="flex py-6 px-8 container justify-between">
        <div className="text-base">
          <p className="">Seats: 5</p>
          <p className="">Wifi: Yes</p>
          <p className="">Outlets: 5</p>
          <p className="">Noise: Low</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="text-3xl">5.5</p>
          <div className="text-xl">
            ★★★★★
          </div>
          <p className="">242 reviews</p>
        </div>
      </div>
      <div className="flex justify-center items-center pb-3">
        <button className="py-2 px-4 rounded rounded-xl bg-accent-5 text-accent-1" onClick={() => window.location.href = `/${place.place_id}/review`}>Leave a review</button>
      </div>
    </div >
  );
}
