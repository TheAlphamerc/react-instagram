import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  limit,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  doc,
  where,
  orderBy,
  startAfter,
} from "firebase/firestore";

import { Profile, ProfileConverter } from "../models/index";

class ProfileService {
  /**
   * Update followers list in logged in user
   * @param {string} loggedInUserId
   * @param {string} secondUserId
   * @param {bool} isFollow
   * @returns
   */
  static async updateMyFollowingUser(
    loggedInUserId: string,
    secondUserId: string,
    isFollow: boolean
  ) {
    try {
      if (isFollow) {
        await updateDoc(doc(collection(db, "users"), loggedInUserId), {
          following: arrayRemove(secondUserId),
        });
        await updateDoc(doc(collection(db, "users"), secondUserId), {
          followers: arrayRemove(loggedInUserId),
        });
      } else {
        await updateDoc(doc(collection(db, "users"), loggedInUserId), {
          following: arrayUnion(secondUserId),
        });
        await updateDoc(doc(collection(db, "users"), secondUserId), {
          followers: arrayUnion(loggedInUserId),
        });
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * Get suggested users list
   * @param {string} userId
   * @param {string} after
   * @param {number} limit
   * @returns
   */
  static async getSuggestedProfiles(
    userId: string,
    after: String,
    pageLimit: number
  ): Promise<Profile[]> {
    try {
      const querySnapshot = query(
        collection(db, "users").withConverter(ProfileConverter),
        where("userId", "!=", userId),
        orderBy("userId"),
        // orderBy("createdAt"),
        startAfter(after),
        limit(pageLimit)
      );
      const docs = await getDocs(querySnapshot);
      const list = docs.docs.map((doc) => doc.data());
      return list;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * Get user profile using username
   * @param {string} username
   * @returns
   */
  static async getProfileByUsername(username: string): Promise<Profile> {
    if (username === "" || username === undefined || username === null) {
      throw "username is not valid";
    }
    console.log("REading profile for", username);
    const querySnapshot = query(
      collection(db, "users").withConverter(ProfileConverter),
      where("username", "==", username)
    );
    const docs = await getDocs(querySnapshot);
    const profile = docs.docs[0].data();
    return profile;
  }

  /**
   * Update user profile
   * @param {string} userId
   * @param {string} fullname
   * @param {string} bio
   * @param {string} website
   * @param {string} profileImage
   * @returns
   */
  static async updateProfile(
    userId: string,
    fullname: string,
    bio: string,
    website: string,
    profileImage: string
  ) {
    try {
      await updateDoc(doc(collection(db, "users"), userId), {
        fullname: fullname,
        bio: bio,
        website: website,
        // profileImage: profileImage,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default ProfileService;
