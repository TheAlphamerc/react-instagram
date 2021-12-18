import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";
import { Profile } from "../models/profile.model";

function UseUser(): Profile {
  const [activeUser, setActiveUser] = useState<any>({});
  const { user } = useContext<any>(UserContext);

  useEffect(() => {
    async function getUserObjectByUserId() {
      const userObject = await getUserByUserId(user.uid);
      setActiveUser(userObject);
    }

    if (user?.uid) {
      getUserObjectByUserId();
    }
  }, [user]);
  return activeUser;
}

export default UseUser;
