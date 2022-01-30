import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { Profile, ProfileConverter } from "../models/index";
import { getUserByUserId } from "../services/auth";
import UseAuthListener from "./use-auth-listener";

function UseUser(): Profile {
  const [activeUser, setActiveUser] = useState<any>({});
  const user = UseAuthListener();
  useEffect(() => {
    async function getUserObjectByUserId() {
      const userObject = await getUserByUserId(user.uid);
      setActiveUser(userObject);
    }

    if (user?.uid) {
      getUserObjectByUserId();
    } else {
      setActiveUser({});
    }
  }, [user]);

  useEffect(() => {
    /// Listen for user data changes
    try {
      const listener = onSnapshot(
        query(
          collection(db, "users").withConverter(ProfileConverter),
          where("userId", "==", user.uid)
        ),
        (querySnapshot) => {
          const list = querySnapshot.docs.map((doc) => doc.data());
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              setActiveUser(list[0]);
            }
            if (change.type === "modified") {
              setActiveUser(list[0]);
            }
            if (change.type === "removed") {
              console.log("User Removed: ", list);
            }
          });
        }
      );

      return () => listener();
    } catch (error) {
      console.log(error);
    }
  },[user]);

  return activeUser;
}

export default UseUser;
