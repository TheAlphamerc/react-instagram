import { memo } from "react";

import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function User({ user }) {
  if (!user) {
    return <Skeleton count={1} height={51} />;
  } else {
    return (
      <Link to={`/p${user.username}`} className="flex items center space-x-4">
        <div className="flex items-center justify-start ">
          <div>
            <div className="h-10 w-10 rounded-full bg-gray-200 ring ring-blue-400  flex justify-center items-center font-semibold">
              {user.avatar != null && (
                <img className="rounded-full" alt="A" src={user.avatar} />
              )}
              {user.fullname ? user.fullname.substring(0, 2).toUpperCase() : ""}
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="text-sm font-bold text-gray-700">{user.fullname}</div>
          <div className="text-sm  text-gray-500">{user.username}</div>
        </div>
      </Link>
    );
  }
}

export default memo(User);
