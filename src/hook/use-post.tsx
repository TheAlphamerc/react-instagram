import { useContext, useEffect, useState } from "react"
import { onSnapshot, collection } from "firebase/firestore";
import { PostConverter, PostModel } from "../models/post";
import { FirebaseContext } from "../context/firebase";

function UsePost(): PostModel | undefined {

    const [updatePost, setUpdatePost] = useState<PostModel | undefined>(undefined);
    const { db } = useContext<any>(FirebaseContext);
    useEffect(() => {
        console.log("Listen for post change");
        try {
            const listener = onSnapshot(collection(db, "posts").withConverter(PostConverter), (querySnapshot) => {
                const list = querySnapshot.docs.map((doc) => doc.data());
                console.log("Listen for post change");
                if (list.length > 0) {
                    console.log("Received Updated Posts", list);
                    setUpdatePost(list[0]);
                }

            }, (error) => {
                console.log("Listener inner", error);

            });
            return () => listener();
        } catch (error) {
            console.log("Listener ", error);
        }

    }, [updatePost,db]);

    return updatePost;
}


export default UsePost;
