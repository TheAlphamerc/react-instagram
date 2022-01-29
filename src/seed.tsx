import { CommentModel, Profile, ProfileConverter } from "./models";
import { PostConverter, PostModel } from "./models/post";

// NOTE: replace 'bEIPMd9MPpX6nDrN29Qi0vIqYg123' with your Firebase auth user id (can be taken from Firebase)

export async function seedDatabase(
  db: any,
  collection: any,
  doc: any,
  setDoc: any
) {
  const users = [
    new Profile({
      userId: "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
      fullname: "John Doe",
      username: "johndoe",
      email: "jon.doe@gmail.com",
      avatar: "https://i.pravatar.cc/300",
      followers: ["bEIPMd9MPpX6nDrN2cdi0vIqYgabc"],
      createdAt: Date.now().toString(),
    }),
    new Profile({
      userId: "bEIPMd9MPpX6nDrN2cdi0vIqYgabc",
      fullname: "Karl Sanzio",
      username: "karlsanzio",
      email: "karl.sanzio@gmail.com",
      avatar: "https://i.pravatar.cc/300",
      following: [
        "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
        "bEdvMd9MPpX6nDrN29Qi0vIqYgxyz",
      ],
      createdAt: Date.now().toString(),
    }),
    new Profile({
      userId: "bEdvMd9MPpX6nDrN29Qi0vIqYgxyz",
      fullname: "Rachel Green",
      username: "rachelgreen",
      email: "rachel.green@gmail.com",
      avatar: "https://i.pravatar.cc/300",
      followers: ["bEIPMd9MPpX6nDrN2cdi0vIqYgabc"],
      createdAt: Date.now().toString(),
    }),
    new Profile({
      userId: "bEIPMd9MPpX6nDrN29Qi0vIqYgpqr",
      fullname: "Raynolds",
      username: "raynolds",
      email: "raynolds@gmail.com",
      avatar: "https://i.pravatar.cc/300",
      createdAt: Date.now().toString(),
    }),
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    const ref = doc(collection(db, "users"), users[k].userId).withConverter(
      ProfileConverter
    );

    await setDoc(ref, users[k]);
  }

  // const post = new PostModel({
  //   id: "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
  //   caption: "Saint George and the Dragon",
  //   attachments: ["https://picsum.photos/500/500"],
  //   likes: ["1", "2", "3"],
  //   comments: [
  //     new CommentModel(
  //       "bEIPMd9MPpX6nDr",
  //       "This is ammazing",
  //       ["1", "2", "3"],
  //       // User who created the comment
  //       Profile.postUser(
  //         "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
  //         "John Doe",
  //         "johndoe",
  //         "https://i.pravatar.cc/300"
  //       ),
  //       // Date of the comment
  //       Date.now()
  //     ),
  //   ],
  //   createdBy: Profile.postUser(
  //     "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
  //     "John Doe",
  //     "johndoe",
  //     "https://i.pravatar.cc/300"
  //   ),
  //   createdAt: Date.now(),
  // });
  // for (let i = 1; i <= 5; ++i) {
  //   const ref = doc(collection(db, "posts"), i.toString()).withConverter(
  //     PostConverter
  //   );

  //   await setDoc(ref, post);
  // }
}
