import { RxAvatar } from "react-icons/rx";
export default function SidePanelBrewReview() {
  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <RxAvatar />
            <span className="">Bryan Chan</span>
            <div className="">
              <span className="">★★★★★</span>
              <span className="">2 months ago</span>
            </div>
          </div>
        </div>
        <p className="">
          This was the best coffee shop I’ve ever been!!!! I love this place
          more than cats
        </p>
      </div>
      <div className="">
        <p className="">Seats: 5</p>
        <p className="">Wifi: Yes</p>
        <p className="">Outlets: 5</p>
        <p className="">Noise: Low</p>
      </div>
    </>
  );
}
