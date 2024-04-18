import Link from "next/link";
import { MdPlace } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

export default function SidePanelOverview() {
  return (
    <div className="max-w-sm border rounded-lg overflow-hidden bg-white">
      <div className="space-y-2 my-2">
        <div className="flex items-center space-x-2">
          {/* BRING DATA IN */}
          <MdPlace />
          <span className="text-sm">207 Washington St, Hoboken, NJ 07030</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaClock />
          <span className="text-sm">Open, Closes 3PM</span>
        </div>
        <div className="flex items-center space-x-2">
          <IoLink />
          <Link className="text-sm" href="#">
            labouchecafe.net
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <FaPhoneAlt />
          <span className="text-sm">(201) 656-9100</span>
        </div>
        <div className="flex items-center space-x-2">
          <MdRestaurantMenu />
          Menu
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 overflow-x-auto">
          <img
            alt="Menu Item Preview"
            className="w-full h-20 object-cover"
            src="/jeffersonscoffee.jpg"
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
          />
          <img
            alt="Menu Item Preview"
            className="w-full h-20 object-cover"
            height="80"
            src="/jeffersonscoffee.jpg"
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width="80"
          />
          <img
            alt="Menu Item Preview"
            className="w-full h-20 object-cover"
            height="80"
            src="/jeffersonscoffee.jpg"
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width="80"
          />
          </div>
    </div>
  );
}
