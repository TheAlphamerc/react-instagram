import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "..";
import ProfileService from "../../services/profile";

function SuggestedProfile({ user, loggedInUserId }) {
  const [followed, setFollowed] = useState(
    user.followers?.includes(loggedInUserId) ?? false
  );

  async function handleFollowUser() {
    setFollowed(!followed);

    await ProfileService.updateMyFollowingUser(
      loggedInUserId,
      user.userId,
      followed
    );
  }
  // if(followed){
  //     return null;
  // }

  return (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        {/* <img src={user.avatar} alt="" className="rounded-full w-8 flex mr-3" /> */}
        <div className="h-8 w-8 rounded-full bg-gray-200  mr-3  flex justify-center items-center ">
          {user.avatar != null ? (
            <img className="rounded-full" alt="A" src={user.avatar} />
          ) : user.fullname ? (
            // user.fullname.substring(0, 2).toUpperCase()
            <UserAvatar
              avatar={user.avatar}
              fullname={user.fullname}
              className="w-8 h-8 text-xs font-semibold"
            />
          ) : (
            ""
          )}
        </div>

        <Link to={`/p/${user.username}`}>
          <p className="font-semibold text-sm flex mr-3">{user.fullname}</p>
        </Link>
      </div>

      <div>
        <button
          className="text-sm font-bold h-8 rounded text-blue-700"
          onClick={handleFollowUser}
        >
          {followed ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default SuggestedProfile;
