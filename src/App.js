import * as ROUTES from "./constants/routes";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Login,
  NoPageFound,
  Profile,
  Signup,
  AccountSettings,
  EditProfile,
  getLoggedInRoute,
  getProtectedRoute,
  Explore,
  People,
} from "./helper/routes.helper";

import Loader from "./components/loader";
import { Suspense } from "react";
import { withFirebase } from "./context/firebase";
import { withSession } from "./context/session";
import { withSessionProvider } from "./context/session";

function App({ user }) {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path={ROUTES.LOGIN_ROUTE}
            element={getLoggedInRoute(user, <Login />)}
          />
          <Route
            path={ROUTES.SIGNUP_ROUTE}
            element={getLoggedInRoute(user, <Signup />)}
          />
          <Route
            path={ROUTES.PROFILE}
            element={getProtectedRoute(user, <Profile />)}
          />
          <Route
            path={ROUTES.DASHBOARD}
            element={getProtectedRoute(user, <Dashboard />)}
          />
          <Route
            path={ROUTES.ACCOUNT_SETTINGS_ROUTE}
            element={getProtectedRoute(user, <AccountSettings />)}
          >
            <Route path={ROUTES.PROFILE_EDIT_ROUTE} element={<EditProfile />} />
          </Route>
          <Route
            path={ROUTES.EXPLORE_ROUTE}
            element={getProtectedRoute(user, <Explore />)}
          >
            <Route path={ROUTES.PEOPLE_ROUTE} element={<People />} />
          </Route>

          <Route path={ROUTES.NO_PAGE_FOUND_ROUTE} element={<NoPageFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default withFirebase(withSessionProvider(withSession(App)));
