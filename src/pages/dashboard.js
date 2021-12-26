import { useEffect } from "react";
// import { seedDatabase } from "../seed";
// import {db,collection,setDoc,doc} from "../lib/firebase";
import * as Components from "../components/index";
import { withSession } from "../context/session";

function Dashbaord({ user }) {
  useEffect(() => {
    try {
      // seedDatabase(db,collection,doc,setDoc);
    } catch (error) {
      console.error(error);
    }
    document.title = "Instagram";
  }, [user]);

  return (
    <div className="bg-gray-100 space-y-16">
      <Components.Header user={user} />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg h-screen">
        <Components.Timeline user={user} />
        <Components.Sidebar user={user} />
      </div>
    </div>
  );
}

export default withSession(Dashbaord);
