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
    profile.followers?.includes(loggedInUser.userId)
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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-4 sm:mx-0 justify-between max-auto max-w-screen-lg ">
        <div className="container flex justfy-center">
          {/* <img className="rounded-full h-32 w-32 flex " src={profile.avatar} /> */}
          <UserAvatar
            className="h-24 w-24 sm:h-32 sm:w-32 text-3xl sm:text-4xl"
            avatar={profile.avatar}
            fullname={profile.fullname}
            username={profile.username}
          />
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

          <div className="container text-sm flex mt-4 hidden sm:inline-flex">
            <p className="mr-4">
              <span className="font-medium">
                {photoCount ?? 0} {photoCount === 1 ? " photo" : " photos"}
              </span>
            </p>
            <p className="mr-10">
              <span className="font-medium">
                {followerCount}{" "}
                {followerCount === 1 ? " follower" : " followers"}
              </span>
            </p>
            <p className="mr-10">
              <span className="font-medium">
                {profile.following?.length ?? 0}{" "}
                {profile.following?.length === 1 ? " following" : " following"}
              </span>
            </p>
          </div>
          <div className="container mt-4">
            <p className="font-bold">{profile.fullname}</p>
          </div>
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
}

function ProfileInfo() {
  return (
    <div className="sm:hidden ">
      <ul className="border-2 flex flex-row justify-between mt-2 px-4 py-1">
        <li className="">
          <div className="flex flex-col items-center ">
            <div className="text-sm font-medium">55</div>{" "}
            <div className="text-gray-500">posts</div>
          </div>
        </li>
        <li className="">
          <a
            className="flex flex-col items-center "
            href="/_sonu_sharma__/followers/"
          >
            <div className="text-sm font-medium" title="155">
              155
            </div>{" "}
            <div className="text-gray-500">followers</div>
          </a>
        </li>
        <li className="">
          <a
            className="flex flex-col items-center "
            href="/_sonu_sharma__/following/"
          >
            <div className="text-sm font-medium">170</div>{" "}
            <div className="text-gray-500">following</div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ProfileHeader;
