import { memo } from "react";

import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserAvatar } from "..";

function User({ user }) {
  if (!user) {
    return <Skeleton count={1} height={51} />;
  } else {
    return (
      <Link to={`/p/${user.username}`} className="flex items center space-x-4">
        <div className="flex items-center justify-start ">
          <div>
            <UserAvatar
              avatar={user.avatar}
              fullname={user.fullname}
              className="h-10 w-10"
            />
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
