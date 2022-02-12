import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import SuggestedProfile from "./suggested-profile";
import ProfileService from "../../services/profile";
import usePeople from "../../hook/use-people";
import { Link } from "react-router-dom";
import { RouteHelper } from "../../helper/routes.helper";

function Suggestions({ userId }) {
  const suggestedUsers = usePeople(userId, 10, 10);

  return (
    <div className=" w-full mb-6 items center bg-white border p-4">
      {!suggestedUsers ? (
        <Skeleton count={4} height={51} />
      ) : suggestedUsers.length > 0 ? (
        <>
          <p className="flex items-center justify-between font-bold text-gray-700 mb-2">
            Suggestions
            <span className="font-normal text-sm">
              <Link to={RouteHelper.EXPLORE_ROUTE}>See all</Link>
            </span>
          </p>
          <div className="mt-4 grid gap-5">
            {suggestedUsers.map((user, index) => (
              <SuggestedProfile
                key={index}
                user={user}
                loggedInUserId={userId}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Suggestions;
