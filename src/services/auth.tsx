import {
  db,
  where,
  query,
  collection,
  getDocs,
  getDoc,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  updateProfile,
  limit
} from "../lib/firebase";

import { Profile, ProfileConverter } from "../models/index";

async function doesUsernameExist(username: string) {
  try {
    const querySnapshot = query(
      collection(db, "users"),
      where("username", "==", username)
    );
    const docs = await getDocs(querySnapshot);
    return docs.docs.length > 0;
  } catch (e) {
    console.log(e);
    throw Error("Somethng went wrong");
  }
}

async function updateUser(auth: any, profile: Profile) {
  try {
    const ref = doc(collection(db, "users"), profile.userId).withConverter(ProfileConverter);

    await setDoc(ref, profile);
    await updateProfile(auth.currentUser, { displayName: profile.fullname });

  } catch (e) {
    console.log(e);
    throw (e);
  }
}


async function createUser(auth: any, username: string, fullname: string, email: string, password: string,): Promise<Profile> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/invalid-email":
            error = ("Email or password is invalid");
            break;
          case "auth/weak-password":
            error = ("Password is week");
            break;
          case "auth/email-already-in-use":
            error = ("Email already in use");
            break;

          default:
            console.log(error.code);
            console.log(error.message);
            error = ("Some thing went wrong. Please try again later");
            break;
        }
        throw error;
      });
    // authentication
    // -> email, password & username (displyname)
    const profile = new Profile(
      userCredential.user.uid,
      fullname,
      username.toLowerCase(),
      email,
      null,
      [],
      [],
      Date.now()
    );
    return profile;
  } catch (e) {
    console.log(e);
    throw (e);
  }
}

async function getUserByUserId(userId: string): Promise<Profile> {
  try {
    const ref = doc(collection(db, "users"), userId).withConverter(ProfileConverter);
    const profileSnap = await getDoc(ref);
    if (profileSnap.exists()) {
      return profileSnap.data();
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    console.log(e);
    throw (e);
  }
}

export { doesUsernameExist, updateUser, createUser, getUserByUserId };