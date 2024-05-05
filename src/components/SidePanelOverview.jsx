import Link from "next/link";
import { MdPlace } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

import { useEffect } from "react";

export default function SidePanelOverview({ place }) {
  useEffect(() => {}, [place]);

  if (!place || Object.keys(place).length <= 0)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="">
      <div className="space-y-2 pl-5 text-xl p-5">
        {place?.formatted_address !== null && (
          <div className="flex items-center space-x-2">
            <MdPlace />
            <span className="text-sm">{place?.formatted_address}</span>
          </div>
        )}
        {place?.open_now !== null && (
          <div className="flex items-center space-x-2">
            <FaClock className="h-4 w-4" />
            <span
              className={
                place?.open_now
                  ? "text-sm text-green-600"
                  : "text-sm text-red-600"
              }
            >
              {place?.open_now ? "Open" : "Closed"}
            </span>
            {/* {place.opening_hours && place.opening_hours.weekday_text && (<span className="text-sm">
            {place.opening_hours.weekday_text.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </span>)} */}
          </div>
        )}
        {place?.website && (
          <div className="flex items-center space-x-2">
            <IoLink />
            <Link className="text-sm" href={place?.website} target="_blank">
              {place?.website}
            </Link>
          </div>
        )}
        {place?.formatted_phone_number && (
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="h-4 w-4" />
            <span className="text-sm">{place?.formatted_phone_number}</span>
          </div>
        )}

        {/* <div className="flex items-center space-x-2">
          <MdRestaurantMenu />
          <span className="text-sm">Menu</span>
        </div> */}
      </div>
    </div>
  );
}
