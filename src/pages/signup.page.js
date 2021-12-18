import { Routes, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import FirebaseContext from "../context/firebase";
import cx from "classnames";
import * as Route from "../constants/routes";
import { Link } from "react-router-dom";
import { doesUsernameExist, createUser,updateUser } from "../services/firebase";
import { Profile, ProfileConverter } from "../models";
import {
  doc,
  db,
  addDoc,
  collection,
  createUserWithEmailAndPassword,
  updateProfile,
  setDoc,
} from "../lib/firebase";
// import { setDoc } from "firebase/firestore/lite";

function Signup() {
  const history = useNavigate();
  const {getAuth} = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValid = password === "" || email === "";

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const usernameExists = await doesUsernameExist(username);
      if (usernameExists) {
        setError("Username already taken, pleas/e try another one");
        return;
      } else {
        setError("");
      }

      const auth = getAuth();
      const profile = await createUser(auth,username,fullname, email, password);
      await updateUser(auth,profile);
      history(Route.DASHBOARD);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  useEffect(() => {
    document.title = "Signup - instagram";
  }, []);

  return (
    <div className="container mx-auto flex max-w-screen-md h-screen">
      <div className="flex w-3/5  m-auto ">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone" />
      </div>

      <div className="flex flex-col w-2/5 place-content-center ">
        <div className="bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justfy-center place-content-center  w-full">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && (
            <p className="text-red-500 mb-4 text-sm  w-full">{error}</p>
          )}

          <form onSubmit={handleSignup} method="post">
            <input
              aria-label="Enter your username"
              className="text-sm text-gray-base w-full
             py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUserName(e.target.value)}
              value={username || ""}
            />
            <input
              aria-label="Enter your full name"
              className="text-sm text-gray-base w-full
            py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              type="text"
              placeholder="Enter fullname"
              onChange={(e) => setFullName(e.target.value)}
              value={fullname || ""}
            />
            <input
              aria-label="Enter your email address"
              className="text-sm text-gray-base w-full
             py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
            />
            <input
              aria-label="Enter your email password"
              className="text-sm text-gray-base w-full
            py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              value={password}
            />
            <button
              type="submit"
              className={cx(
                "bg-blue-500 text-white w-full py-3 rounded font-bold px-4 rounded mb-2"
              )}
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="flex justfy-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account?{" "}
            <Link to={Route.LOGIN_ROUTE} className="font-bold text-blue-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

//text-red-primary
//text-gray-base
// border-grey-primary
// bg-blue-medium
