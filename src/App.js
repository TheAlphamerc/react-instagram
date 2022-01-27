import * as ROUTES from "./constants/routes";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Login,
  NoPageFound,
  Profile,
  Signup,
  getLoggedInRoute,
  getProtectedRoute,
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
          ></Route>
          <Route
            path={ROUTES.DASHBOARD}
            element={getProtectedRoute(user, <Dashboard />)}
          ></Route>
          <Route path={ROUTES.NO_PAGE_FOUND_ROUTE} element={<NoPageFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default withFirebase(withSessionProvider(withSession(App)));
