import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import SidePanel from "../pages/sidepanel";
import React, { useState } from "react";

const API_KEY = "AIzaSyAZwAu96Gif8e4TnJXZzRYv0Bz3B_z6-ec";

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
  });
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const [map, setMap] = React.useState(null);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onClick = React.useCallback((marker) => {
    setMapCenter(marker);
    setShowSidePanel(true);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} onClick={onClick} />
          ))}
          ;
        </GoogleMap>
      )}
      {showSidePanel && <SidePanel />}
    </div>
  );
}
