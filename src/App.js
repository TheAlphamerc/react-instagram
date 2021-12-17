import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import login from "./pages/login.page";
const Login = lazy(() => import("./pages/login.page"));
const Signup = lazy(() => import("./pages/signup.page"));
const NoPageFound = lazy(() => import("./pages/no-page-found.page"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading..</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN_ROUTE} element={<Login />} />
          <Route path={ROUTES.SIGNUP_ROUTE} element={<Signup />} />
          <Route path={ROUTES.NO_PAGE_FOUND_ROUTE} element={<NoPageFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
