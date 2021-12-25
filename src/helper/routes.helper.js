import { Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { lazy } from "react";
const Login = lazy(() => import("../pages/login.page"));
const Profile = lazy(() => import("../pages/profile.page"));
const Signup = lazy(() => import("../pages/signup.page"));
const Dashbaord = lazy(() => import("../pages/dashboard"));
const NoPageFound = lazy(() => import("../pages/no-page-found.page"));

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
export { Profile, Login, Signup, Dashbaord, NoPageFound };
export { getProtectedRoute, getLoggedInRoute ,ROUTES as RouteHelper};
