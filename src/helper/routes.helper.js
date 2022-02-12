import * as ROUTES from "../constants/routes";

import { Navigate } from "react-router-dom";
import { lazy } from "react";
const Login = lazy(() => import("../pages/login.page"));
const Profile = lazy(() => import("../pages/profile.page"));
const Signup = lazy(() => import("../pages/signup.page"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const NoPageFound = lazy(() => import("../pages/no-page-found.page"));
const AccountSettings = lazy(() => import("../pages/settings/account-settings.page"))
const EditProfile = lazy(() => import("../pages/settings/edit-profile.page"));
const Explore = lazy(() => import("../pages/explore/explore.page"));
const People = lazy(() => import("../pages/explore/people.page"));

function getProtectedRoute(user, element) {
  if (!(user && Object.keys(user).length === 0)) {
    return element;
  }
  return <Login />;
}
function getLoggedInRoute(user, element) {
  if (!(user && Object.keys(user).length === 0)) {
    return <Navigate to={ROUTES.DASHBOARD} from={location} />;
  }
  return element;
}
export { Profile, Login, Signup, Dashboard, NoPageFound ,AccountSettings,EditProfile,Explore,People};
export { getProtectedRoute, getLoggedInRoute ,ROUTES as RouteHelper};
