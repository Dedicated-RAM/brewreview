import Link from "next/link";
import SidePanelOverview from "@/components/SidePanelOverview";
import SidePanelGoogleReview from "@/components/SidePanelGoogleReview";
import SidePanelBrewReview from "../components/SidePanelBrewReview";

import "../styles/globals.css";

import { useEffect, useState } from "react";

export default function SidePanel() {
  const [panel, setPanel] = useState("overview");
  const [display, setDisplay] = useState();
  useEffect(() => {
    switch (panel) {
      case "overview":
        setDisplay(<SidePanelOverview />);
        break;
      case "google-review":
        setDisplay(<SidePanelGoogleReview />);
        break;
      case "brew-review":
        setDisplay(<SidePanelBrewReview />);
        break;
    }
  }, [panel]);

  return (
    <>
      <div className="h-full w-1/3 fixed z-1 top-0 left-0 overflow-x-hidden bg-accent-1 font-short-stack text-accent-6">
        <img
          alt="Jefferson's Coffee Shop"
          className="object-cover w-full h-30"
          src="/jeffersonscoffee.jpg"
        />
        <div className="">
          <h1 className="text-3xl font-bold pl-5 pt-5">Jefferson's Coffee</h1>
          <div className="pl-5">
            <span className="">5.5</span>
            <span className="">★★★★★</span>
            <span className="">(242)</span>
          </div>
        </div>
        <div className="flex items-center place-content-center justify-evenly py-3 font-medium">
          <button
            variant="ghost"
            className="py-2 px-4 rounded"
            onClick={() => setPanel("overview")}
          >
            Overview
          </button>
          <button
            variant="ghost"
            className="py-2 px-4 rounded"
            onClick={() => setPanel("google-review")}
          >
            Google
            <br />
            Reviews
          </button>
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

        {display}
      </div>
    </>
  );
}
