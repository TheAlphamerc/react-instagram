import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

function UseAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const {firebase} = useContext(FirebaseContext);

  const { getAuth,onAuthStateChanged } = useContext(FirebaseContext);
  useEffect(() => {
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        localStorage.setItem("authUser", JSON.stringify(user));
        setUser(user);
        // ...
      } else {
        // User is signed out
       localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    return ()=> listener();
  },[firebase]);
  return {user}
}

export default UseAuthListener;
