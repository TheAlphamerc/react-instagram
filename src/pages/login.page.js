import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import FirebaseContext from "../context/firebase";
import cx from "classnames";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as Route from "../constants/routes";
import { Link } from "react-router-dom";

function Login() {
  const history = useNavigate();
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValid = password === "" || email === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          history(Route.DASHBOARD);
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              setError("Email or password is invalid");
              break;
            case "user-not-found":
              setError("User not exists"); 
              break;
            case "auth/wrong-password":
              setError("Wrong password");
              break;
            
            default: 
            console.log(error.code);
            console.log(error.message);
            setError("Some thing went wrong. Please try again later");
              break;
          }
        });
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    document.title = "Login - instagram";
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
                "bg-blue-500 text-white w-full py-3 rounded font-bold px-4 rounded mb-2",
                
              )}
            >
              Log in
            </button>
          </form>
        </div>
        <div className="flex justfy-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to={Route.SIGNUP_ROUTE} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

//text-red-primary
//text-gray-base
// border-grey-primary
// bg-blue-medium
