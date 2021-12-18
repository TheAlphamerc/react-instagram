import { memo } from "react";

import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function User({ user }) {
  if (!user) {
    return <Skeleton count={1} height={51} />;
  } else {
    return (
      <Link
        to={`/p${user.username}`}
        className="grid grid-cols-4 gap-4 mb-6 items center"
      >
        <div className="flex items-center justify-between col-span-1">
          <div>
            <p className="h-8 w-8  font-bold flex items-center   place-content-center ring rounded-full bg-gray-300">
              {user.fullname ? user.fullname.substring(0, 2).toUpperCase() : ""}
            </p>
          </div>
        </div>
        <div className="col-span-3 ">
          <div className="text-sm font-bold text-gray-700">{user.username}</div>
          <div className="text-sm  text-gray-500">{user.fullname}</div>
        </div>
      </Link>
    );
  }
}

export default memo(User);
