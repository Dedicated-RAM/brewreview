import Link from "next/link";
import { MdPlace } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

import { useEffect } from 'react';

export default function SidePanelOverview({ place }) {
  useEffect(() => { }, [place]);

  if (!place || Object.keys(place).length <= 0) return (<div><p>Loading...</p></div>);

  return (
    <div className="">
      <div className="space-y-2 pl-5 text-xl p-5">
        <div className="flex items-center space-x-2">
          <MdPlace />
          <span className="text-sm">{place.formatted_address}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaClock />
          <span className="text-sm">
            {place.opening_hours.weekday_text.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <IoLink />
          <Link className="text-sm" href={place.website} target="_blank">
            {place.website}
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <FaPhoneAlt />
          <span className="text-sm">{place.formatted_phone_number}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MdRestaurantMenu />
          <span className="text-sm">Menu</span>
        </div>
      </div>
    </div>
  );
}
