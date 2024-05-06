import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../../../styles/globals.css";
import SidePanelOverview from "@/components/SidePanelOverview";
import SidePanelGoogleReview from "@/components/SidePanelGoogleReview";
import SidePanelBrewReview from "@/components/SidePanelBrewReview";

import { auth } from "../../../lib/firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Review() {
  const [seats, setSeats] = useState("");
  const [outlets, setOutlets] = useState("");
  const [errors, setErrors] = useState([]);
  const [place, setPlace] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { placeid } = router.query;

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (!authUser) router.push("/login");
    });
  }, []);

  useEffect(() => {
    if (placeid) {
      (async () => {
        const res = await fetch(`/api/cafe/${placeid}`);
        const data = await res.json();
        setPlace(data.result.result);
        setLoading(false);
      })();
    }
  }, [placeid]);

  const validateForm = () => {
    let errors = [];
    if (!Number.isInteger(Number(seats)) || Number(seats) < 0) {
      errors.push("Seats must be a non-negative integer.");
    }
    if (!Number.isInteger(Number(outlets)) || Number(outlets) < 0) {
      errors.push("Outlets must be a non-negative integer.");
    }
    setErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    alert("Submitted!");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-accent-1 flex font-short-stack inset-0 justify-center items-center overflow-y-auto">
      <div className="m-auto p-10 rounded-lg w-auto rounded-md h-auto">
        <h1 className="text-2xl font-bold text-accent-6">{place.name}</h1>
        <form className="flex flex-col gap-1">
          <label className="mt-4 text-accent-6 text-1xl" htmlFor="starRating">
            Give it a star rating
          </label>
          <div className="rating rating-lg">
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-accent-5"
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-accent-5"
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-accent-5"
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-accent-5"
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-accent-5"
            />
          </div>
          <label className="mt-4 text-accent-6 text-1xl">
            How many seats were there?
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="number"
            id="seats"
            name="seats"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />
          <label className="mt-4 text-accent-6 text-1xl">Was there wifi?</label>
          <input type="checkbox" defaultChecked className="checkbox" />
          <label className="mt-4 text-accent-6 text-1xl">
            How many outlets?
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="number"
            id="outlets"
            name="outlets"
            value={outlets}
            onChange={(e) => setOutlets(e.target.value)}
          />
          <label className="mt-4 text-accent-6 text-1xl">
            How was the noise?
          </label>
          {/* <div className="flex items-center">
            <p className="text-accent-6">Low</p>
            <input
              type="range"
              min={0}
              max="100"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="range mx-2"
            />
            <p className="text-accent-6">High</p>
          </div> */}
          <div className="flex items-center text-sm">
            <div className="flex items-center mr-4">
              <input type="radio" name="radio-1" className="radio" />
              <span className="ml-2 text-accent-6">Very Quiet</span>
            </div>
            <div className="flex items-center mr-4">
              <input type="radio" name="radio-1" className="radio" />
              <span className="ml-2 text-accent-6">Quiet</span>
            </div>
            <div className="flex items-center mr-4">
              <input type="radio" name="radio-1" className="radio" />
              <span className="ml-2 text-accent-6">Medium</span>
            </div>
            <div className="flex items-center mr-4">
              <input type="radio" name="radio-1" className="radio" />
              <span className="ml-2 text-accent-6">Loud</span>
            </div>
            <div className="flex items-center mr-4">
              <input type="radio" name="radio-1" className="radio" />
              <span className="ml-2 text-accent-6">Very Loud</span>
            </div>
          </div>
          <label className="mt-4 text-accent-6 text-1xl" htmlFor="review">
            Leave a review
          </label>
          <textarea
            className="rounded-md border-2 border-accent-5 p-2"
            id="review"
            name="review"
            rows="4"
          />
          {errors.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
          <button
            className="bg-accent-5 text-accent-1 p-2 rounded-md mt-4 font-bold text-1xl w-36 mx-auto"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="m-auto p-10">
        <h1 className="text-2xl font-bold text-accent-6">Brew Reviews</h1>
        <SidePanelBrewReview hideForm={true} place={place} />
        <h1 className="text-2xl font-bold text-accent-6">Google Reviews</h1>
        <SidePanelGoogleReview place={place} />
      </div>
    </div>
  );
}
