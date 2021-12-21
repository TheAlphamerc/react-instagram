import { useEffect } from "react";
// import { seedDatabase } from "../seed";
// import {db,collection,setDoc,doc} from "../lib/firebase";
import * as Components from "../components/index";
import { withSessionProvider } from "../context/session";
import { withSession } from "../context/session";
import { withFirebase } from "../context/firebase";

function Dashbaord({ user }) {
  useEffect(() => {
    try {
      // seedDatabase(db,collection,doc,setDoc);
      console.log("Dashboard user", user);
    } catch (error) {
      console.error(error);
    }
    document.title = "Instagram";
  }, [user]);

  return (
    <div className="bg-gray-100 h-screen">
      <Components.Header user={user} />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Components.Timeline user={user} />
        <Components.Sidebar user={user} />
      </div>
    </div>
  );
}

export default withSession(Dashbaord);
