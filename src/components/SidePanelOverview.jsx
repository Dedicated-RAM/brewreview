import Link from "next/link";
import { MdPlace } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { useRouter } from "next/router";
import Image from "next/image";

import { useEffect } from "react";

export default function SidePanelOverview({ place }) {
  const router = useRouter();

  useEffect(() => {}, [place]);

  if (!place || Object.keys(place).length <= 0)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  const onClick = () => {
    router.push({
      pathname: "/group/create",
      query: {
        placeName: place.name,
        placeId: place.place_id,
      },
    });
  };

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

        <div className="flex flex-col justify-center items-center h-full">
          <div className="mt-auto mb-4">
            <button
              className="bg-accent-5 text-accent-1 p-2 rounded-md"
              onClick={onClick}
            >
              Create Group
            </button>
          </div>
        </div>

        {/* <div className="flex flex-row overflow-x-auto space-x-2 p-2.5">
          {place?.photos?.map((photo, index) => (
            <div key={index} className="flex-shrink-0 w-64 h-64 p-2.5">
              <Image
                src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}&sensor=false&maxheight=400&maxwidth=400&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                alt={place.name}
                width={512}
                height={512}
                objectFit="cover"
              />
            </div>
          ))}
        </div> */}

        {/* <div className="flex items-center space-x-2">
          <MdRestaurantMenu />
          <span className="text-sm">Menu</span>
        </div> */}
      </div>
    </div>
  );
}
