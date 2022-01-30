// import { seedDatabase } from "../seed";
// import {db,collection,setDoc,doc} from "../lib/firebase";
import * as Components from "../components/index";

import { useEffect, useRef } from "react";

import { withSession } from "../context/session";

function Dashboard({ user }) {
  const createPostRef = useRef();

  useEffect(() => {
    try {
      // seedDatabase(db,collection,doc,setDoc);
    } catch (error) {
      console.error(error);
    }
    document.title = "Instagram";
  }, [user]);

  return (
    <div className="bg-gray-100 space-y-16 overscroll-none ">
      <Components.Header user={user} createPostRef={createPostRef} />
      <div className="grid lg:grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg  overscroll-none">
        <Components.Timeline user={user} createPostRef={createPostRef} />
        <Components.Sidebar user={user} />
      </div>
    </div>
  );
}

export default withSession(Dashboard);
