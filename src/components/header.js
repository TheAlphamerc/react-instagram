import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { signOut, getAuth } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  console.log("Render Header");
  console.log(user);
  return (
    <div className="h-16 bg-white border-b border-gray-200 mb-8">
      <div className="container mx-auto  max-w-screen-lg h-full">
        <div className="flex justify-between h-full px-4">
          {/* LOGO */}
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
              <img
                src="/images/logo.png"
                alt="instagram"
                className="mt-2 w-6/12"
              />
            </Link>
          </div>
          {/* Home | Logout | User */}
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link
                  to={ROUTES.DASHBOARD}
                  className="w-9 mr-6 text-black-500 cursor-pointer"
                >
                  <FontAwesomeIcon className="" icon={faHome} />
                </Link>
                <button
                  type="button"
                  title="Sign out"
                  onClick={async (e) => await signOut(getAuth())}
                  onKeyDown={async (event) => {
                    if (event.key === "Enter") {
                      await signOut(getAuth());
                    }
                  }}
                >
                  <FontAwesomeIcon className="" icon={faSignOutAlt} />
                </button>
                {
                  !user.displayName ? null : <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <div className="h-8 w-8 ml-4 font-bold flex items-center   place-content-center ring rounded-full bg-gray-300">
                      {user.displayName.substring(0, 2).toUpperCase()}
                    </div>
                  </Link>
                </div>
                }
                
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN_ROUTE}
                  className="text-black-500 cursor-pointer"
                >
                  <button className="bg-blue-700 text-sm font-bold w-20 h-8 rounded text-white">
                    Log in
                  </button>
                </Link>

                <Link
                  to={ROUTES.SIGNUP_ROUTE}
                  className="text-black-500 cursor-pointer"
                >
                  <button className="text-sm font-bold w-20 h-8 rounded text-blue-700">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
