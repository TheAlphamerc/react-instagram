import { db } from "../lib/firebase";
import {
    collection, getDocs, limit, updateDoc, arrayUnion, arrayRemove, query, doc, where
} from "firebase/firestore";

import { Profile, ProfileConverter } from "../models/index";



async function updateMyFollowingUser(loggedInUserId: string, secondUserId: string, isFollow: boolean) {
    try {
        if (isFollow) {

            await updateDoc(doc(collection(db, "users"), loggedInUserId), {
                following: arrayRemove(secondUserId)
            });
            await updateDoc(doc(collection(db, "users"), secondUserId), {
                followers: arrayRemove(loggedInUserId)
            });
        } else {

            await updateDoc(doc(collection(db, "users"), loggedInUserId), {
                following: arrayUnion(secondUserId)
            });
            await updateDoc(doc(collection(db, "users"), secondUserId), {
                followers: arrayUnion(loggedInUserId)
            });
        }
    } catch (e) {
        console.log(e);
        throw (e);
    }
}


async function getSuggestedProfiles(userId: string): Promise<Profile[]> {
    try {

        const querySnapshot = query(
            collection(db, "users").withConverter(ProfileConverter),
            where("userId", "!=", userId),
            limit(10)
        );
        const docs = await getDocs(querySnapshot)
        const list = docs.docs.map((doc) => doc.data())
        return list;

    } catch (e) {
        console.log(e);
        throw (e);
    }
}

export { updateMyFollowingUser, getSuggestedProfiles };