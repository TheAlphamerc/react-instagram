import { useState } from "react";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, getAuth } from "firebase/auth";
import {
  faHome,
  faPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import CreatePostModelComponent from "../components/create-post/create-post-model-component";

function Header({ user }) {
  const isLogout = user && Object.keys(user).length === 0;
  const [createPostModel, setCreatePostModel] = useState(false);

  return (
    <div className="h-16 bg-white border-b border-gray-200 mb-8">
      <CreatePostModelComponent
        user={user}
        active={createPostModel}
        setActive={setCreatePostModel}
      />

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
            {!isLogout ? (
              <>
                <Link
                  to={ROUTES.DASHBOARD}
                  className="w-9 mr-6 text-black-500 cursor-pointer"
                >
                  <FontAwesomeIcon className="" icon={faHome} />
                </Link>
                <div
                  className="flex items-center justify-center border-2 border-black rounded h-6 w-6 cursor-pointer mr-4 select-none"
                  onClick={() => {
                    setCreatePostModel(true);
                    console.log("create post", createPostModel);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
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
                {!user.fullname ? null : (
                  <div className="flex items-center cursor-pointer">
                    <Link to={`/p/${user.username}`}>
                      <div className="h-8 w-8 ml-4 font-bold flex items-center   place-content-center ring rounded-full bg-gray-300">
                        {user.fullname.substring(0, 2).toUpperCase()}
                      </div>
                    </Link>
                  </div>
                )}
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
