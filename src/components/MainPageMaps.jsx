import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import SidePanel from "./SidePanelMain";
import React, { useState } from "react";

import { Autocomplete } from "@react-google-maps/api";
import { BsPhoneLandscape } from "react-icons/bs";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LIBRARIES = ["places", "geometry", "drawing"];

const containerStyle = {
  width: "100vw",
  height: "calc(100vh - 64px)",
};

const center = {
  lat: 40.745255,
  lng: -74.034775,
};

export default function MainPageMaps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES,
  });

  const [placeMarkers, setPlaceMarkers] = useState([]);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);
  const [placeData, setPlaceData] = useState({});
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place.geometry) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setPlaceMarkers((prev) => [...prev, place]);
      }

      if (place.place_id) {
        setPlaceData(place);
        setShowSidePanel(true);
      }
    }
  };

  const onClick = (place) => {
    setPlaceData(place);
    setShowSidePanel(true);
  };

  const closeSidePanel = () => {
    setShowSidePanel(false);
  };

  return (
    <div className="h-screen">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
          options={{
            fullscreenControl: false,
          }}
        >
          {placeMarkers.map((place, index) => (
            <Marker
              key={index}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              onClick={() => onClick(place)}
            />
          ))}
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            className="z-10"
          >
            <input
              className="font-short-stack absolute top-8 left-2/3 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-md border-2 border-accent-5 bg-accent-1 text-accent-6 w-1/2"
              type="text"
              placeholder="Search for a cafe"
              onChange={(e) => {
                const { value } = e.target;
                if (autocomplete !== null) {
                  const options = {
                    types: ["cafe"],
                  };
                  autocomplete.setOptions(options);
                }
              }}
            />
          </Autocomplete>
        </GoogleMap>
      )}

      {showSidePanel && (
        <SidePanel onClose={closeSidePanel} place={placeData} />
      )}
    </div>
  );
}
