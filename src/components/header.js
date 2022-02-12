import * as ROUTES from "../constants/routes";

import {
  faHome,
  faPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";

import CreatePostModelComponent from "../components/create-post/create-post-model-component";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserAvatar } from ".";

function Header({ user, createPostRef }) {
  const isLogout = user && Object.keys(user).length === 0;
  const [createPostModel, setCreatePostModel] = useState(false);

  return (
    <div className="fixed top-0 right-0 left-0 z-10 h-16 bg-white border-b border-gray-200 mb-8">
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
          <div className="text-gray-700 text-center flex items-center space-x-6 align-items">
            {!isLogout ? (
              <>
                <Link
                  to={ROUTES.DASHBOARD}
                  className="text-black-500 cursor-pointer"
                >
                  <FontAwesomeIcon size="lg" className="" icon={faHome} />
                </Link>
                <div
                  ref={createPostRef}
                  className="flex items-center justify-center border-2 border-black rounded-lg h-6 w-6 cursor-pointer select-none"
                  onClick={() => {
                    setCreatePostModel(true);
                  }}
                >
                  <FontAwesomeIcon size="sm" icon={faPlus} />
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
                  <FontAwesomeIcon size="lg" className="" icon={faSignOutAlt} />
                </button>
                {!user.fullname ? null : (
                  <div className="flex items-center cursor-pointer">
                    <Link to={`/p/${user.username}`}>
                      <UserAvatar
                        avatar={user.avatar}
                        fullname={user.fullname}
                        className="w-8 h-8 text-sm"
                      />
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
