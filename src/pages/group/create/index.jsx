"use client";

import { useState } from "react";
import Link from "next/link";
import "../../../styles/globals.css";
import {
  GoogleMap,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LIBRARIES = ["places", "geometry", "drawing"];

export default function Group({ props }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES,
  });
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [maxGroupNumber, setMaxGroupNumber] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [location, setLocation] = useState("");

  const validateForm = () => {
    let errorList = [];
    if (!groupName) errorList.push("Group Name is required.");
    if (!groupDescription) errorList.push("Group Description is required.");
    if (!maxGroupNumber) errorList.push("Max Group Number is required.");
    if (!time) errorList.push("Time is required.");
    if (!date) errorList.push("Date is required.");
    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      alert(
        "Group Name: " + groupName + "\nGroup Description: " + groupDescription
      );
    }
  };
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

      setPlaceData(place);
      setShowSidePanel(true);
    }
  };

  return (
    <div className="bg-accent-1 flex font-short-stack inset-0 flex justify-center items-center pt-8 overflow-y-auto">
      <div className="m-auto p-10 bg-accent-2 rounded-lg shadow-lg w-1/2 rounded-md">
        <h1 className="text-6xl font-bold text-center text-accent-6">
          Create Group
        </h1>
        <form className="flex flex-col gap-1 mt-4" onSubmit={handleSubmit}>
          <label className="mt-4 text-accent-6 text-2xl" htmlFor="groupName">
            Group Name
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="text"
            id="groupName"
            name="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <label
            className="mt-4 text-accent-6 text-2xl"
            htmlFor="groupDescription"
          >
            Group Description
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="text"
            id="groupDescription"
            name="groupDescription"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />
          <label htmlFor="Location" className="mt-4 text-accent-6 text-2xl">
            Location
          </label>
          {isLoaded && (
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              className="z-10"
            >
              <input
                className="rounded-md border-2 border-accent-5 p-2 w-full"
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
          )}
          <label
            htmlFor="maxGroupNumber"
            className="mt-4 text-accent-6 text-2xl"
          >
            Max Group Number
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="number"
            id="maxGroupNumber"
            name="maxGroupNumber"
            value={maxGroupNumber}
            onChange={(e) => setMaxGroupNumber(e.target.value)}
          />
          <label htmlFor="date" className="mt-4 text-accent-6 text-2xl">
            Date
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="time" className="mt-4 text-accent-6 text-2xl">
            Time
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
          <div className="flex justify-center items-center space-x-4 p-4">
            <button type="submit" className="btn btn-primary">
              Create Group
            </button>
            <Link href="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
