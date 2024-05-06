"use client";

import { useState } from "react";
import Link from "next/link";
import "../../../styles/globals.css";

export default function Group() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Group 1",
      description: "This is group 1",
      maxCount: 5,
      members: ["Evan Cheng", "John Doe", "Jane Doe"],
    },
    {
      id: 2,
      name: "Group 2",
      description: "This is group 2",
      maxCount: 5,
      members: [],
    },
    {
      id: 3,
      name: "Group 3",
      description: "This is group 3",
      maxCount: 5,
      members: [],
    },
    {
      id: 4,
      name: "Group 4",
      description: "This is group 4",
      maxCount: 5,
      members: [],
    },
    {
      id: 5,
      name: "Group 5",
      description: "This is group 5",
      maxCount: 5,
      members: [],
    },
    {
      id: 6,
      name: "Group 6",
      description: "This is group 6",
      maxCount: 5,
      members: [],
    },
    {
      id: 7,
      name: "Group 7",
      description: "This is group 7",
      maxCount: 5,
      members: [],
    },
    {
      id: 8,
      name: "Group 8",
      description: "This is group 8",
      maxCount: 5,
      members: [],
    },
    {
      id: 9,
      name: "Group 9",
      description: "This is group 9",
      maxCount: 5,
      members: [],
    },
    {
      id: 10,
      name: "Group 10",
      description: "This is group 10",
      maxCount: 5,
      members: [],
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
      <Link href="/">
        <button className="btn btn-square absolute top-5 right-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Link>

      <div className="m-auto p-10 bg-accent-2 rounded-lg shadow-lg w-1/2 rounded-md">
        <h1 className="text-6xl font-bold text-center text-accent-6">Groups</h1>
        <div className="flex flex-col gap-3 mt-4">
          {groups.map((group) => (
            <div key={group.id} className="bg-accent-3 p-4 rounded-md">
              <h2 className="text-4xl font-bold text-accent-6">{group.name}</h2>
              <p className="text-accent-6 text-1xl">{group.description}</p>
              <p className="text-accent-6 text-2xl">Members:</p>
              <ul className="flex flex-col gap-.5">
                {group.members.map((member, index) => (
                  <li key={index} className="text-accent-6">
                    {member}
                  </li>
                ))}
              </ul>
              <p className="text-accent-6">
                {group.members.length}/{group.maxCount}
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
