"use client";

import { useState } from "react";
import Link from "next/link";
import "../../../styles/globals.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import SidePanelMain from "@/components/SidePanelMain";

import { auth } from "../../../lib/firebase/FirebaseConfig";

import {
  getGroups,
  getGroupsById,
  editGroup,
} from "../../../lib/firebase/firestore";

export default function Group() {
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const groups = await getGroups();
      setGroups(groups);
      console.log("ping");
    })();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      setUser(authUser ? authUser : null);
    });
  }, [user, auth]);

  const joinGroup = (groupId) => {
    if (!auth.currentUser) Router.push("/login");
    const group = groups.find((group) => group.id === groupId);
    if (group.members.length < group.max_count) {
      editGroup(groupId, {
        members: [...group.members, auth.currentUser.displayName],
      });
    }
  };

  const leaveGroup = (groupId) => {
    if (!auth.currentUser) Router.push("/login");
    const group = groups.find((group) => group.id === groupId);
    editGroup(groupId, {
      members: group.members.filter(
        (member) => member !== auth.currentUser.displayName,
      ),
    });
  };

  const onClick = (locationId) => {
    setShowPanel(true);
    setLocation(locationId);
  };

  const onclose = () => {
    setShowPanel(false);
  };

  return (
    <div className="bg-accent-1 inline-flex font-short-stack justify-center items-center overflow-auto pt-8 p-16">
      <div className="m-auto p-10 bg-accent-2 rounded-lg shadow-lg rounded-md">
        <h1 className="text-3xl font-bold text-center text-accent-6 mb-8">
          Groups
        </h1>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-accent-3 p-6 rounded-md w-auto">
              <div className="flex justify-between space-x-4">
                <h2 className="text-2xl font-bold text-accent-6 mb-4">
                  {group.name}
                </h2>
                <h2 className="text-accent-6 text-xl mb-4 mt-auto">
                  {group.members.length} / {group.max_count} members
                </h2>
              </div>

              <p className="text-accent-6 text-lg mb-4">{group.description}</p>
              <button
                className="text-accent-1 text-xl mb-4 bg-accent-5 p-2 rounded-md"
                onClick={() => onClick(group.locationId)}
              >
                Location: {group.location}
              </button>
              <p className="text-accent-6 text-xl mb-4">Members:</p>
              <ul className="text-accent-6 text-xl mb-4">
                {group.members.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
              <p className="text-accent-6 text-xl mb-4">
                {group.time} on {group.date}
              </p>
              {user && (
                <button
                  className="text-accent-2 bg-accent-5 p-2 rounded-md"
                  onClick={() =>
                    group.members.includes(auth?.currentUser?.displayName)
                      ? leaveGroup(group.id)
                      : joinGroup(group.id)
                  }
                >
                  {group.members.includes(auth?.currentUser?.displayName)
                    ? "Leave Group"
                    : "Join Group"}
                </button>
              )}
            </div>
          ))}
          {showPanel && <SidePanelMain place={location} onClose={onclose} />}
        </div>
      </div>
    </div>
  );
}
