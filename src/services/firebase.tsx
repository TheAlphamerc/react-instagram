import {
  db,
  where,
  query,
  collection,
  getDocs,
  createUserWithEmailAndPassword,
  getAuth,
  doc,
  setDoc,
  updateProfile,
} from "../lib/firebase";

import { Profile, ProfileConverter } from "../models/profile.model";

async function doesUsernameExist(username:string) {
  try {
    const querySnapshot = query(
      collection(db, "users"),
      where("username", "==", username)
    );
    const docs = await getDocs(querySnapshot);
    return docs.docs.length > 0;
  } catch (e) {
    console.log(e);
    throw "Somethng went wrong";
  }
}



async function updateUser(profile: Profile) {
  try {
    const ref = doc(collection(db, "users"), profile.userId).withConverter(ProfileConverter);

    await setDoc(ref, profile);

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
        var error;
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
    // -> emailAddress, password & username (displyname)
    const profile = new Profile(
      userCredential.user.uid,
      fullname,
      username.toLowerCase(),
      email,
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

export { doesUsernameExist, updateUser, createUser };