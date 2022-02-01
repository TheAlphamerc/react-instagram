import { dispatch, useDispatch, useReducer } from "react";
import { useEffect } from "react";
import ProfileService from "../../services/profile";
import FeedService from "../../services/feed";
import Photos from "./photos";
import ProfileHeader from "./profile-header";

function ProfileComponent({ profile, loggedInUser }) {
  const reducer = (state, newState) => ({ ...state, ...newState });

  const initialState = {
    postCollection: {},
    followerCount: profile.followers?.length ?? 0,
  };

  const [{ postCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    document.title = "instagram - Profile";
    async function getProfile() {
      const postCollection = await FeedService.getUserPostsByUsername(
        profile.username
      );
      dispatch({
        postCollection: postCollection,
        followerCount: profile.followers?.length ?? 0,
      });
    }
    if (profile) {
      getProfile();
    }
  }, [profile.username]);

  return (
    <div className="mx-auto max-w-screen-lg pt-6">
      <ProfileHeader
        profile={profile}
        loggedInUser={loggedInUser}
        photoCount={postCollection.length}
        followerCount={followerCount}
        setFollowCount={dispatch}
      />
      
      <Photos photos={postCollection} user={loggedInUser} />
    </div>
  );
}

export default ProfileComponent;
