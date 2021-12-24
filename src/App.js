import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import { withFirebase } from "./context/firebase";
import { withSessionProvider } from "./context/session";
import { withSession } from "./context/session";
import Loder from "./components/loader";
const Login = lazy(() => import("./pages/login.page"));
const Signup = lazy(() => import("./pages/signup.page"));
const Dashbaord = lazy(() => import("./pages/dashboard"));
const NoPageFound = lazy(() => import("./pages/no-page-found.page"));

function App({ user }) {
  function getProtectedRoute(element) {
    if (!(user && Object.keys(user).length === 0)) {
      console.log("Navigate to dashbaord", user);
      return element;
    }
    console.log("NAvigate to login", user);
    return <Login />;
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<Loder />}>
        <Routes>
          <Route path={ROUTES.LOGIN_ROUTE} element={<Login />} />
          <Route path={ROUTES.SIGNUP_ROUTE} element={<Signup />} />
          <Route
            path={ROUTES.DASHBOARD}
            element={getProtectedRoute(<Dashbaord />)}
          ></Route>
          <Route
            path={ROUTES.NO_PAGE_FOUND_ROUTE}
            element={getProtectedRoute(<NoPageFound />)}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default withFirebase(withSessionProvider(withSession(App)));
