import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  doc,
  setDoc,
  where,
} from "firebase/firestore";
import {
  signOut,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { seedDatabase } from "../seed.js";

const config = {
  apiKey: "AIzaSyDAv_F_c6Wg-LsVhbL38Z9RHMyW3A5bTwA",
  authDomain: "react-instagram-9284e.firebaseapp.com",
  projectId: "react-instagram-9284e",
  storageBucket: "react-instagram-9284e.appspot.com",
  messagingSenderId: "718982163479",
  appId: "1:718982163479:web:046bbd54684ad0bd6e0052",
  measurementId: "G-NRW3V5G962",
};

const firebase = initializeApp(config);

const db = getFirestore(firebase);

// seedDatabase(db);
export {
  updateProfile,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};
export { firebase, db, collection, doc, where, query, getDocs,getDoc, addDoc, setDoc };
