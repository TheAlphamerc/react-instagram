import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import { ProtectedRoute } from "./components/protected-route";
import { withFirebase } from "./context/firebase";
import { withSessionProvider } from "./context/session";
import { withSession } from "./context/session";

const Login = lazy(() => import("./pages/login.page"));
const Signup = lazy(() => import("./pages/signup.page"));
const Dashbaord = lazy(() => import("./pages/dashboard"));
const NoPageFound = lazy(() => import("./pages/no-page-found.page"));

function App({user }) {
  return (
    // <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Suspense fallback={<p>Loading..</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN_ROUTE} element={<Login />} />
            <Route path={ROUTES.SIGNUP_ROUTE} element={<Signup />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashbaord />} />
            {/* <ProtectedRoute
              isAuthChecked={true}
              path={ROUTES.DASHBOARD}
              element={<Dashbaord />}
            /> */}
            <Route
              path={ROUTES.NO_PAGE_FOUND_ROUTE}
              element={<NoPageFound />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    // </UserContext.Provider>
  );
}

export default withFirebase(withSessionProvider(withSession(App)));
