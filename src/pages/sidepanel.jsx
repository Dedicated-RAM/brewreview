import Link from "next/link";
import SidePanelOverview from "@/components/SidePanelOverview";
import "../styles/sidepanel.css";
import SidePanelGoogleReview from "@/components/SidePanelGoogleReview";
import SidePanelBrewReview from "../components/SidePanelBrewReview";

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
      <div className="sidepanel-class">
        <img
          alt="Jefferson's Coffee Shop"
          className=""
          src="/jeffersonscoffee.jpg"
        />
        <div className="">
          <h1 className="">Jefferson's Coffee</h1>
          <div className="">
            <span className="">5.5</span>
            <span className="">★★★★★</span>
            <span className="">(242)</span>
          </div>
        </div>

        <div className="">
          <button variant="ghost" onClick={() => setPanel("overview")}>
            Overview
          </button>
          <button variant="ghost" onClick={() => setPanel("google-review")}>
            Google Reviews
          </button>
          <button variant="ghost" onClick={() => setPanel("brew-review")}>
            Brew Reviews
          </button>
        </div>

        {display}
      </div>
    </>
  );
}
