// import { collection,setDoc } from "firebase/firestore/lite";
import { CommentModel, Profile, ProfileConverter } from "./models";
import { PostConverter, PostModel } from "./models/post";
// NOTE: replace 'bEIPMd9MPpX6nDrN29Qi0vIqYg123' with your Firebase auth user id (can be taken from Firebase)
export async function seedDatabase(db: any, collection: any, doc: any, setDoc: any) {
  const users = [
    new Profile(
      // User id
      "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
      // User name
      "John Doe",
      // Unique user name
      "johndoe",
      // User email
      "jon.doe@gmail.com",
      // User avatar
      "https://i.pravatar.cc/300",
      // User ids of following user
      [],
      // User ids of followers user
      ["bEIPMd9MPpX6nDrN2cdi0vIqYgabc"],
      // Profile creation date
      Date.now()
    ),
    new Profile(
      "bEIPMd9MPpX6nDrN2cdi0vIqYgabc",
      "Karl Sanzio",
      "karlsanzio",
      "karl.sanzio@gmail.com",
      "https://i.pravatar.cc/300",
      ["bEIPMd9MPpX6nDrN29Qi0vIqYg123", "bEdvMd9MPpX6nDrN29Qi0vIqYgxyz"],
      [],
      Date.now()
    ),
    new Profile(
      "bEdvMd9MPpX6nDrN29Qi0vIqYgxyz",
      "Rachel Green",
      "rachelgreen",
      "rachel.green@gmail.com",
      "https://i.pravatar.cc/300",
      [],
      ["bEIPMd9MPpX6nDrN2cdi0vIqYgabc"],
      Date.now()
    ),
    new Profile(
      "bEIPMd9MPpX6nDrN29Qi0vIqYgpqr",
      "Raynolds",
      "raynolds",
      "raynolds@gmail.com",
      "https://i.pravatar.cc/300",
      [],
      [],
      Date.now()
    )
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    const ref = doc(collection(db, "users"), users[k].userId).withConverter(ProfileConverter);

    await setDoc(ref, users[k]);
  }

  const post = new PostModel(
    // Post id
    "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
    // Post caption
    "Saint George and the Dragon",
    // Attchements list
    ["https://picsum.photos/500/500"],
    // UserIds of the users who liked the post
    ["1", "2", "3"],
    // Comments
    [
      new CommentModel(
        "bEIPMd9MPpX6nDr",
        "This is ammazing",
        ["1", "2", "3"],
        // User who created the comment
        Profile.postUser(
          "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
          "John Doe",
          "johndoe",
          "https://i.pravatar.cc/300"
        ),
        // Date of the comment
        Date.now(),
      )
    ],
    /// User who created the post
    Profile.postUser(
      "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
      "John Doe",
      "johndoe",
      "https://i.pravatar.cc/300"
    ),
    // Date of the post
    Date.now()
  );
  for (let i = 1; i <= 5; ++i) {
    const ref = doc(collection(db, "posts"), i.toString()).withConverter(PostConverter);

    await setDoc(ref, post);
  }
}
