import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import SuggestedProfile from "./suggested-profile";
import { getSuggestedProfiles } from "../../services/profile";

function Suggestions({ userId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(async () => {
    if (userId) {
      const list = await getSuggestedProfiles(userId);
      setProfiles(list);
    }
  }, [userId]);

  return (
    <div className=" w-full mb-6 items center bg-white border p-4">
      {!profiles ? (
        <div className="">
          <Skeleton count={4} height={51} />
        </div>
      ) : profiles.length > 0 ? (
        <div>
          <p className="font-bold text-gray-700 mb-2">Suggestions</p>
          <div className="mt-4 grid gap-5">
            {profiles.map((user, index) => (
              <SuggestedProfile key={index} user={user} loggedInUserId={userId} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Suggestions;
