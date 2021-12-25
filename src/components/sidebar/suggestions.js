import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import SuggestedProfile from "./suggested-profile";
import ProfileService from "../../services/profile";

function Suggestions({ userId }) {
  const [suggestedUsers, setSuggestedUsers] = useState(null);

  useEffect( () => {
    async function fetchSuggestedProfiles() {
      const list = await ProfileService.getSuggestedProfiles(userId);
      setSuggestedUsers(list);
    }
    if (userId) {
      fetchSuggestedProfiles(); 
    }
  }, [userId]);

  return (
    <div className=" w-full mb-6 items center bg-white border p-4">
      {!suggestedUsers ? (
        <Skeleton count={4} height={51} />
      ) : suggestedUsers.length > 0 ? (
        <>
          <p className="font-bold text-gray-700 mb-2">Suggestions</p>
          <div className="mt-4 grid gap-5">
            {suggestedUsers.map((user, index) => (
              <SuggestedProfile
                key={index}
                user={user}
                loggedInUserId={userId}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Suggestions;
