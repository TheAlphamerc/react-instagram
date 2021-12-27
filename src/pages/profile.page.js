import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileService from "../services/profile";
import { withSession } from "../context/session";
import { RouteHelper } from "../helper/routes.helper";
import Loader from "../components/loader";
import Header from "../components/header";
import ProfileComponent from "../components/profile/";
import Skeleton from "react-loading-skeleton";

function ProfilePage({ user }) {
  const { username } = useParams();
  const [profile, setProfile] = useState();

  const history = useNavigate();
  useEffect(() => {
    async function getProfile() {
      try {
        const data = await ProfileService.getProfileByUsername(username);
        if (data) {
          setProfile(data);
        } else {
          history(RouteHelper.NO_PAGE_FOUND);
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
    if (username != null && username !== undefined) {
      getProfile();
    }
  }, [username]);

  if (!profile) {
    return <Loader />;
  }
  return (
    <div className="bg-gray-100 h-screen space-y-16">
      <Header user={user} />
      <ProfileComponent profile={profile} loggedInUser={user} />
    </div>
  );
}

export default withSession(ProfilePage);
