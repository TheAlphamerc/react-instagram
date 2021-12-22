import { useState } from "react";
import { Link } from "react-router-dom";
import { updateMyFollowingUser } from "../../services/profile";

function SuggestedProfile({ user, loggedInUserId }) {
  const [followed, setFollowed] = useState(
    user.followers.includes(loggedInUserId)
  );

  async function handleFollowUser() {
    setFollowed(!followed);

    await updateMyFollowingUser(loggedInUserId, user.userId, followed);
  }
  // if(followed){
  //     return null;
  // }

  return (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        {/* <img src={user.avatar} alt="" className="rounded-full w-8 flex mr-3" /> */}
        <div className="h-8 w-8 rounded-full bg-gray-200  mr-3 text-sm  flex justify-center items-center font-semibold">
          {user.avatar != null ? (
            <img className="rounded-full" alt="A" src={user.avatar} />
          ) : user.fullname ? (
            user.fullname.substring(0, 2).toUpperCase()
          ) : (
            ""
          )}
        </div>

        <Link to={`/p/${user.userId}`}>
          <p className="fon-bold text-sm flex mr-3">{user.fullname}</p>
        </Link>
      </div>

      <div>
        <button
          className="text-sm font-bold h-8 rounded text-blue-700"
          onClick={handleFollowUser}
        >
          {followed ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default SuggestedProfile;
