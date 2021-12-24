import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import * as ROUTES from "./constants/routes";
import { withFirebase } from "./context/firebase";
import { withSessionProvider } from "./context/session";
import { withSession } from "./context/session";
import Loder from "./components/loader";
import {
  getProtectedRoute,
  getLoggedInRoute,
  Profile,
  Login,
  Signup,
  Dashbaord,
  NoPageFound,
} from "./helper/routes.helper";

function App({ user }) {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loder />}>
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
            element={getProtectedRoute(user, <Dashbaord />)}
          ></Route>
          <Route path={ROUTES.NO_PAGE_FOUND_ROUTE} element={<NoPageFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default withFirebase(withSessionProvider(withSession(App)));
