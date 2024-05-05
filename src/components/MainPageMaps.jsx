import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import SidePanel from "../pages/sidepanel";
import React, { useState } from "react";

import { Autocomplete } from "@react-google-maps/api";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LIBRARIES = ["places", "geometry", "drawing"];

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const markers = [{ lat: 40.743303, lng: -74.029331 }];
const center = {
  lat: 40.745255,
  lng: -74.034775,
};

export default function MainPageMaps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES
  });

  const [showSidePanel, setShowSidePanel] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);
  const [placeData, setPlaceData] = useState({});
  const [placeId, setPlaceId] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setPlaceData(place);
      setShowSidePanel(true);
    }
  };

  const onClick = (marker) => {
    setMapCenter(marker);
    setShowSidePanel(true);
  };

  const closeSidePanel = () => {
    setShowSidePanel(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      {isLoaded && (
        <div style={{ flex: 1 }}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input type="text" placeholder="Search for a place" style={{ position: "absolute", top: "10px", right: "10px", zIndex: "1" }} />
            </Autocomplete>
            {markers.map((marker, index) => (
              <Marker key={index} position={marker} onClick={() => onClick(marker)} />
            ))}
          </GoogleMap>
        </div>
      )}
      {showSidePanel && <SidePanel onClose={closeSidePanel} place={placeData} />}
    </div>
  );
}
