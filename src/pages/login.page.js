import * as Route from "../constants/routes";

import Loader, { Spinner } from "../components/loader";
import { Suspense, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import cx from "classnames";
import { loginWithEmailPassword } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginWithEmailPassword(email, password);
      history(Route.DASHBOARD);
      console.log("login success");
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Login - instagram";
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className="container mx-auto flex max-w-screen-md h-screen">
        <div className="flex w-3/5  m-auto hidden sm:inline">
          <img
            className="aspect-[9/12.31]"
            src="/images/iphone-with-profile.jpg"
            alt="iPhone"
          />
        </div>
        <div className="flex flex-col w-3/5 place-content-center mx-auto">
          <div className="bg-white p-4 border border-gray-primary mb-4 rounded">
            <h1 className="flex justify-center place-content-center  w-full">
              <img
                src="/images/logo.png"
                alt="instagram"
                className="mt-2 w-6/12 mb-4"
              />
            </h1>
            {error && (
              <p className="text-red-500 mb-4 text-sm  w-full">{error}</p>
            )}

            <form onSubmit={handleLogin} method="post">
              <input
                aria-label="Enter your email address"
                className="text-sm text-gray-base w-full
             py-5 px-4 h-2 border border-grey-primary rounded mb-2"
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                aria-label="Enter your email password"
                className="text-sm text-gray-base w-full
            py-5 px-4 h-2 border border-grey-primary rounded mb-2"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              <button
                type="submit"
                className={cx(
                  "flex place-content-center  bg-blue-500 text-white w-full py-3 rounded font-bold px-4 rounded mb-2"
                )}
              >
                {loading ? (
                  <Spinner className="h-6 w-6" white={true} />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                to={Route.SIGNUP_ROUTE}
                className="font-bold text-blue-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Login;
