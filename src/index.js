import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import {firebase,signOut,db,getAuth,onAuthStateChanged} from "./lib/firebase";

ReactDOM.render(
   <React.StrictMode>
    <FirebaseContext.Provider value={{firebase,signOut, db,getAuth,onAuthStateChanged}}>
       <App />  
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


// Client side rendered app: react
  // -> database which is firebase
  // -> react-loading-skeleton
  // -> tailwind

// Folder Structure
  // -> src
    // -> component
    // -> constant
    // -> context
    // -> helper
    // -> hooks
    // -> models
    // -> lib (fireabse is going to live here)
    // -> service (firebase functions in here)
    // -> styles (tailwind's folder (app/tailwind))