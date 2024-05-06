"use client";

import { useState } from "react";
import Link from "next/link";
import "../../../styles/globals.css";

export default function Group() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Group 1",
      description: "We are trying to study for CS554 at the library.",
      location: "Library",
      maxCount: 5,
      members: ["Evan Cheng", "Bryan Chan", "Aidan Haberman"],
      time: "12:00 PM",
      date: "1/1/2024",
    },
  ]);

  const joinGroup = (groupId) => {
    const group = groups.find((group) => group.id === groupId);
    if (group.members.length < group.maxCount) {
      group.members.push("User");
      setGroups([...groups]);
    }
  };

  return (
    <div className="bg-accent-1 flex font-short-stack inset-0 flex justify-center items-center overflow-auto pt-8">
      <div className="m-auto p-10 bg-accent-2 rounded-lg shadow-lg w-1/2 rounded-md">
        <h1 className="text-6xl font-bold text-center text-accent-6 mb-8">
          Groups
        </h1>
        <div className="flex flex-col gap-6 mt-4">
          {groups.map((group) => (
            <div key={group.id} className="bg-accent-3 p-6 rounded-md">
              <div className="flex justify-between">
                <h2 className="text-4xl font-bold text-accent-6 mb-4">
                  {group.name}
                </h2>
                <h2 className="text-accent-6 text-xl mb-4 mt-auto">
                  {group.members.length} / {group.maxCount} members
                </h2>
              </div>

              <p className="text-accent-6 text-lg mb-4">{group.description}</p>
              <p className="text-accent-6 text-xl mb-4">
                Location: {group.location}
              </p>
              <p className="text-accent-6 text-xl mb-4">
                Members:
                {group.members.map((member, index) => (
                  <span key={index} className="ml-2">
                    {member}
                  </span>
                ))}
              </p>
              <p className="text-accent-6 text-xl mb-4">
                {group.time} on {group.date}
              </p>
              <button className="text-accent-2 bg-accent-5 p-2 rounded-md">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
