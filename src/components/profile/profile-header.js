import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "..";
import { RouteHelper } from "../../helper/routes.helper";
import ProfileService from "../../services/profile";

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
        <div className="container flex sm:justify-center items-center space-x-6">
          <UserAvatar
            className="h-20 w-20 sm:h-36 sm:w-36 text-3xl sm:text-4xl"
            avatar={profile.avatar}
            fullname={profile.fullname}
            username={profile.username}
          />
          <div className="sm:hidden">
            <FollowNEditProfileButton
              profile={profile}
              isMyProfile={isMyProfile}
              isFollowingProfile={isFollowingProfile}
              handleFollowUser={handleFollowUser}
            />
          </div>
        </div>

        <div className="col-span-2">
          <div className="hidden sm:block">
            <FollowNEditProfileButton
              profile={profile}
              isMyProfile={isMyProfile}
              isFollowingProfile={isFollowingProfile}
              handleFollowUser={handleFollowUser}
            />
          </div>
          <ProfileStateSM
            profile={profile}
            photoCount={photoCount}
            followerCount={followerCount}
          />
          <BioNWebsite profile={profile} />
         
        </div>
      </div>

      <ProfileStates
        user={profile}
        photoCount={photoCount}
        followerCount={followerCount}
      />
    </div>
  );
}
const FollowNEditProfileButton = ({
  profile,
  isMyProfile,
  handleFollowUser,
  isFollowingProfile,
}) => {
  const button = !isMyProfile ? (
    <button
      className="bg-blue-600 font-bold text-xs rounded text-white px-2 h-6"
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
  ) : (
    <Link
      to={RouteHelper.getProfileEditAccount()}
      className="flex items-center place-items-center  border px-2 py rounded  text-sm font-semibold border-gray-400 h-6"
    >
      Edit Profile
    </Link>
  );

  return (
    <div className="flex flex-col sm:flex-row  space-y-1  items-center place-content-center sm:place-content-start">
      <div className="flex items-end">
        <span className="text-3xl mr-4 inline-block align-bottom">
          {profile.username}
        </span>
      </div>
      {button}
    </div>
  );
};
const BioNWebsite = ({ profile }) => {
  return (
    <div className="container mt-4">
      <p className="font-bold">{profile.fullname}</p>
      <p className="text-sm ">{profile.bio}</p>
      {profile.website && (
        <p className="text-blue-700 text-sm m2-4">
          <a href={profile.website}>{profile.website}</a>
        </p>
      )}
    </div>
  );
};
const ProfileStateSM = ({ profile, photoCount, followerCount }) => {
  return (
    <div className="container text-sm flex mt-4 hidden sm:inline-flex">
      <p className="mr-4">
        <span className="font-bold">{photoCount ?? 0}</span>{" "}
        <span className="">{photoCount === 1 ? " photo" : " photos"}</span>
      </p>
      <p className="mr-10">
        <span className="font-bold">{followerCount}&nbsp;</span>
        <span className="">
          {followerCount === 1 ? " follower" : " followers"}
        </span>
      </p>
      <p className="mr-10">
        <span className="font-bold">{profile.following?.length ?? 0} </span>
        <span className="">
          {profile.following?.length === 1 ? " following" : " following"}
        </span>
      </p>
    </div>
  );
};
const ProfileStates = ({ user, photoCount, followerCount }) => {
  return (
    <div className="sm:hidden ">
      <ul className="border-2 flex flex-row justify-between mt-2 px-4 py-1">
        <li className="">
          <div className="flex flex-col items-center ">
            <div className="text-sm font-medium">{photoCount}</div>{" "}
            <div className="text-gray-500">posts</div>
          </div>
        </li>
        <li className="">
          <a
            className="flex flex-col items-center "
            href={`/${user.username}/followers/`}
          >
            <div className="text-sm font-medium" title="155">
              {followerCount}
            </div>
            <div className="text-gray-500">followers</div>
          </a>
        </li>
        <li className="">
          <a
            className="flex flex-col items-center "
            href={`/${user.username}/following/`}
          >
            <div className="text-sm font-medium">{user.following?.length}</div>
            <div className="text-gray-500">following</div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileHeader;
