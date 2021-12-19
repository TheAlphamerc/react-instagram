// import { collection,setDoc } from "firebase/firestore/lite";
import {  Profile, ProfileConverter } from "./models";
// NOTE: replace 'bEIPMd9MPpX6nDrN29Qi0vIqYg123' with your Firebase auth user id (can be taken from Firebase)
export async function seedDatabase(db:any, collection:any,doc:any, setDoc:any) {
  const users = [
    new Profile(
      "bEIPMd9MPpX6nDrN29Qi0vIqYg123",
      "John Doe",
      "johndoe",
      "jon.doe@gmail.com",
      "https://i.pravatar.cc/300",
      [],
      ["bEIPMd9MPpX6nDrN2cdi0vIqYgabc"],
       Date.now()
    ),
    new Profile(
      "bEIPMd9MPpX6nDrN2cdi0vIqYgabc",
      "Karl Sanzio",
      "karlsanzio",
      "karl.sanzio@gmail.com",
      "https://i.pravatar.cc/300",
      ["bEIPMd9MPpX6nDrN29Qi0vIqYg123","bEdvMd9MPpX6nDrN29Qi0vIqYgxyz"],
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

  // eslint-disable-next-line prefer-const
  // for (let i = 1; i <= 5; ++i) {
  //   setDoc(collection(db, "photos"), {
  //     photoId: i,
  //     userId: "2",
  //     imageSrc: `https://i.pravatar.cc/300`,
  //     caption: "Saint George and the Dragon",
  //     likes: [],
  //     comments: [
  //       {
  //         displayName: "dali",
  //         comment: "Love this place, looks like my animal farm!",
  //       },
  //       {
  //         displayName: "orwell",
  //         comment: "Would you mind if I used this picture?",
  //       },
  //     ],
  //     userLatitude: "40.7128°",
  //     userLongitude: "74.0060°",
  //     createdAt: Date.now(),
  //   });
  // }
}
