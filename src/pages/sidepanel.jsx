import Link from "next/link";
import SidePanelOverview from "@/components/SidePanelOverview";
import SidePanelGoogleReview from "@/components/SidePanelGoogleReview";
import SidePanelBrewReview from "../components/SidePanelBrewReview";

import "../styles/globals.css";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SidePanel({ onClose, place }) {
  const [panel, setPanel] = useState("overview");
  const [display, setDisplay] = useState();
  const [loading, setLoading] = useState(true);
  const [placeData, setPlaceData] = useState({});
  const [placePhoto, setPlacePhoto] = useState("");

  useEffect(() => {
    if (place) {
      (async () => {
        const res = await fetch(`/api/cafe/${place.place_id}`);
        const data = await res.json();
        const defaultPhoto =
          "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png";
        let photoRes = { data: { result: defaultPhoto } };
        try {
          photoRes = await axios.get(
            `/api/photo/${data.result.result.photos[0].photo_reference}`,
          );
        } catch (error) {
          console.error("Error fetching photo", error);
        }
        setPlacePhoto(photoRes.data.result);

        setPlaceData(data.result.result);
        console.log(JSON.stringify(placeData));
        setLoading(false);
      })();
    }
  }, [place]);

  useEffect(() => {
    switch (panel) {
      case "overview":
        setDisplay(<SidePanelOverview place={placeData} />);
        break;
      case "google-review":
        setDisplay(<SidePanelGoogleReview place={placeData} />);
        break;
      case "brew-review":
        setDisplay(<SidePanelBrewReview place={placeData} />);
        break;
    }
  }, [panel, placeData]);

  if (!place || !placeData || Object.keys(placeData).length <= 0)
    return (
      <>
        <div className="h-full w-1/3 fixed z-1 top-0 left-0 overflow-x-hidden bg-accent-1 font-short-stack text-accent-6">
          <button className="btn btn-square absolute top-5 right-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={onClose}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="">
            <h1 className="text-3xl font-bold pl-5 pt-5 center">Loading...</h1>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="h-[calc(100vh-64px)] w-1/3 absolute z-10 top-16 left-0 overflow-x-hidden bg-accent-1 font-short-stack text-accent-6">
        <button className="btn btn-square absolute top-5 right-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={onClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          alt="Jefferson's Coffee Shop"
          className="object-cover w-full h-30"
          src={placePhoto}
        />
        <div className="">
          <h1 className="text-3xl font-bold pl-5 pt-5">{place.name}</h1>
          <div className="pl-5">
            <span className="">
              {placeData.rating}
              {Array.from(
                { length: Math.floor(placeData.rating) },
                (_, index) => (
                  <span key={index}>★</span>
                ),
              )}
            </span>
            <span className=""></span>
            <span className="">({placeData.user_ratings_total})</span>
          </div>
        </div>
        <div className="flex items-center place-content-center justify-evenly py-3 font-medium">
          <div
            className={panel == "overview" ? "border-b-2 border-accent-4" : ""}
          >
            <button
              variant="ghost"
              className="py-2 px-4 rounded"
              onClick={() => setPanel("overview")}
            >
              Overview
            </button>
          </div>
          <div
            className={
              panel == "google-review" ? "border-b-2 border-accent-4" : ""
            }
          >
            <button
              variant="ghost"
              className="py-2 px-4 rounded"
              onClick={() => setPanel("google-review")}
            >
              Google
              <br />
              Reviews
            </button>
          </div>
          <div
            className={
              panel == "brew-review" ? "border-b-2 border-accent-4" : ""
            }
          >
            <button
              variant="ghost"
              className="py-2 px-4 rounded"
              onClick={() => setPanel("brew-review")}
            >
              Brew
              <br />
              Reviews
            </button>
          </div>
        </div>
        {display}
      </div>
    </>
  );
}
