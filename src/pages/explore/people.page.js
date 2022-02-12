import React, { useEffect, useState } from "react";
import usePeople from "././../../hook/use-people";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SuggestedProfile from "../../components/sidebar/suggested-profile";
import { withSession } from "../../context/session";

function PeoplePageComponent({ user }) {
  const people = usePeople(user.userId, 20);

  return (
    <div className="grid grid-cols-1 justify-between mx-auto max-w-screen-sm  overscroll-none">
      <p className="font-bold text-gray-700 mb-2">Suggestions</p>
      <div className="mb-6 items center bg-white border p-4">
        {!people ? (
          <Skeleton count={10} height={51} />
        ) : people.length > 0 ? (
          <>
            <div className="mt-4 grid gap-5">
              {people.map((people, index) => (
                <SuggestedProfile
                  key={index}
                  user={people}
                  loggedInUserId={user.userId}
                />
              ))}
            </div>
          </>
        ) : (
          <div> No suggestion Available </div>
        )}
      </div>
    </div>
  );
}
export default withSession(PeoplePageComponent);
