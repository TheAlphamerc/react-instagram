import { useContext, useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  QuerySnapshot,
} from "firebase/firestore";
import { PostConverter, PostModel } from "../models/post";
import { FirebaseContext } from "../context/firebase";
import { db } from "../lib/firebase";
import { SessionContext } from "../context/session";

function UsePost(): QuerySnapshot<PostModel> | undefined {
  const [changePost, setChangePost] = useState<
    QuerySnapshot<PostModel> | undefined
  >(undefined);
  const user = useContext<any>(SessionContext);
  useEffect(() => {
    console.log("Listen for post change");
    try {
      const listener = onSnapshot(
        query(
          collection(db, "posts").withConverter(PostConverter),
          where("createdBy.userId", "==", user.userId)
        ),
        (querySnapshot) => {
          const list = querySnapshot.docs.map((doc) => doc.data());
          setChangePost(querySnapshot);
        },
        (error) => {
          console.log("Listener inner", error);
        }
      );

      return () => listener();
    } catch (error) {
      console.log("Listener ", error);
    }
  }, [db]);

  return changePost;
}

export default UsePost;
