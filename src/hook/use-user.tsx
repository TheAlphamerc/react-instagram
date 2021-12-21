import { useState, useEffect, useContext } from "react";
import {FirebaseContext} from "../context/firebase";
import { getUserByUserId } from "../services/auth";
import { Profile } from "../models/index";
import UseAuthListener from "./use-auth-listener";

function UseUser(): Profile {
  const [activeUser, setActiveUser] = useState<any>({});
  const user  = UseAuthListener();
  console.log("USe-user-hook", user);
  useEffect(() => {
    console.log("Getting user",user);
    async function getUserObjectByUserId() {
      const userObject = await getUserByUserId(user.uid);
      setActiveUser(userObject);
    }

    if (user?.uid) {
      getUserObjectByUserId();
    }else{
      setActiveUser({});
    }
  }, [user]);
  return activeUser;
}

export default UseUser;
