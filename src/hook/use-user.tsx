import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/auth";
import { Profile } from "../models/index";

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
