import { useContext, useEffect, useState } from "react";
import { onSnapshot, collection, query } from "firebase/firestore";
import { PostConverter, PostModel } from "../models/post";
import { FirebaseContext } from "../context/firebase";
import { db } from "../lib/firebase";

function UsePost(): PostModel | undefined {
  const [updatePost, setUpdatePost] = useState<PostModel | undefined>(
    undefined
  );
//   const { db } = useContext<any>(FirebaseContext);
  useEffect(() => {
    console.log("Listen for post change");
    try {
      const listener = onSnapshot(
        collection(db, "posts").withConverter(PostConverter),
        (querySnapshot) => {
          const list = querySnapshot.docs.map((doc) => doc.data());
          
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              console.log("Added List: ",list.length);
            //   setUpdatePost(list[0]);
            }
            if (change.type === "modified") {
                console.log("Modified List: ",list.length);
            }
            if (change.type === "removed") {
                console.log("Removed List: ",list.length);
            }
          });
        },
        (error) => {
          console.log("Listener inner", error);
        }
      );

      return () => listener();
    } catch (error) {
      console.log("Listener ", error);
    }
  }, [updatePost, db]);

  return updatePost;
}

export default UsePost;
