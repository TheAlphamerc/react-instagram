import { dispatch, useDispatch, useReducer } from "react";
import { useEffect, useState } from "react";

import FeedService from "../../services/feed";
import ProfileService from "../../services/profile";
import Skeleton from "react-loading-skeleton";
import { UserAvatar } from "..";

function ProfileHeader({
  profile,
  loggedInUser,
  photoCount,
  followerCount,
  setFollowCount,
}) {
  const [isFollowingProfile, setIsFollowingProfile] = useState(
    profile.followers.includes(loggedInUser.userId)
  );
  const [isMyProfile, setIsMyProfile] = useState(
    profile.username === loggedInUser.username
  );

  const handleFollowUser = async () => {
    setIsFollowingProfile(!isFollowingProfile);
    setFollowCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await ProfileService.updateMyFollowingUser(
      loggedInUser.userId,
      profile.userId,
      isFollowingProfile
    );
  };
  return (
    <div className="grid grid-cols-3 gap-4 justify-between max-auto max-w-screen-lg ">
      <div className="container flex justfy-center">
        {/* <img className="rounded-full h-32 w-32 flex " src={profile.avatar} /> */}
        <UserAvatar className="h-32 w-32 text-4xl" avatar={profile.avatar} fullname={profile.fullname} username={profile.username}/>
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
          {!isMyProfile ? (
            <button
              className="bg-blue-600 font-bold text-xs rounded text-white w-20 h-8"
              onClick={handleFollowUser}
              type="button"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleFollowUser();
                }
              }}
            >
              {isFollowingProfile ? "Following" : "Follow"}
            </button>
          ) : null}
        </div>

        <div className="container text-sm flex mt-4 ">
          <p className="mr-4">
            <span className="font-medium">
              {photoCount ?? 0} {photoCount === 1 ? " photo" : " photos"}
            </span>
          </p>
          <p className="mr-10">
            <span className="font-medium">
              {followerCount} {followerCount === 1 ? " follower" : " followers"}
            </span>
          </p>
          <p className="mr-10">
            <span className="font-medium">
              {profile.following.length}{" "}
              {profile.following.length === 1 ? " following" : " following"}
            </span>
          </p>
        </div>
        <div className="container mt-4">
              <p className="font-bold">
                {profile.fullname}
              </p>

        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
