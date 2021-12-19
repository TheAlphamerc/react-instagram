import {
    db,
    where,
    query,
    collection,
    getDocs,
    setDoc,
    updateProfile,
    limit,

} from "../lib/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { getUserByUserId } from "./auth";

import { Profile, ProfileConverter } from "../models/profile.model";



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
        // const myUser = await getUserByUserId(loggedInUserId);
        // const secondUser = await getUserByUserId(secondUserId);
        // if(myUser.following.includes(secondUserId)){
        //     /// Follow user
        //     myUser.following.splice(myUser.following.indexOf(secondUserId),1)
        //     secondUser.followers.splice(secondUser.followers.indexOf(loggedInUserId),1)

        // }else{
        //     // Unfollow user
        //     myUser.following.push(secondUserId);
        //     secondUser.followers.push(loggedInUserId);
        // }
        // await setDoc(doc(collection(db, "users"), loggedInUserId).withConverter(ProfileConverter), myUser);
        // await setDoc(doc(collection(db, "users"), secondUser.userId).withConverter(ProfileConverter), secondUser);
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
        console.log(list)
        return list;

    } catch (e) {
        console.log(e);
        throw (e);
    }
}

export { updateMyFollowingUser, getSuggestedProfiles };