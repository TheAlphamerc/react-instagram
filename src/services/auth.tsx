import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  query,
  doc,
  setDoc,
  where,
} from "firebase/firestore";
import {
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
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
    throw Error("Something went wrong");
  }
}

async function loginWithEmailPassword(
  email: string,
  password: string
): Promise<UserCredential> {
  const auth = getAuth();
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          error = "Email or password is invalid";
          break;
        case "auth/user-not-found":
          error = "User not exists";
          break;
        case "auth/wrong-password":
          error = "Incorrect password";
          break;

        case "auth/too-many-requests":
          error = "You have tried too many times. Please try again later";
          break;

        default:
          error = "Some thing went wrong. Please try again later";
          break;
      }
      throw error;
    });
    return userCredential;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createUser(
  username: string,
  fullname: string,
  email: string,
  password: string
): Promise<Profile> {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      console.log(error);
      switch (error.code) {
        case "auth/invalid-email":
          error = "Email or password is invalid";
          break;
        case "auth/weak-password":
          error = "Password is week";
          break;
        case "auth/email-already-in-use":
          error = "Email already in use";
          break;

        default:
          console.log(error.code);
          console.log(error.message);
          error = "Some thing went wrong. Please try again later";
          break;
      }
      throw error;
    });
    // authentication
    // -> email, password & username (displyname)
    const profile = new Profile({
      userId: userCredential.user.uid,
      fullname: fullname,
      username: username.toLowerCase(),
      email: email,
      createdAt: Date.now(),
      followers: [],
      following: [],
    });

    const ref = doc(collection(db, "users"), profile.userId).withConverter(
      ProfileConverter
    );

    await setDoc(ref, profile);
    const currentUser = auth.currentUser;
    if (currentUser) {
      await updateProfile(currentUser, { displayName: profile.fullname });
    }

    return profile;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getUserByUserId(userId: string): Promise<Profile> {
  try {
    const ref = doc(collection(db, "users"), userId).withConverter(
      ProfileConverter
    );
    const profileSnap = await getDoc(ref);
    if (profileSnap.exists()) {
      return profileSnap.data();
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export {
  doesUsernameExist,
  createUser,
  loginWithEmailPassword,
  getUserByUserId,
};
