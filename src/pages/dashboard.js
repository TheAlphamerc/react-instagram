import { useEffect } from "react";
// import { seedDatabase } from "../seed";
// import {db,collection,setDoc,doc} from "../lib/firebase";
import useUser from "../hook/use-user";
import * as Components from "../components/index";

function Dashbaord() {
  const user = useUser();

  useEffect(() => {
    try {
      // seedDatabase(db,collection,doc,setDoc);
    } catch (error) {
      console.error(error);
    }
    document.title = "Instagram";
  });
  
  return (
    <div className="bg-gray-100 h-screen">
      <Components.Header  user={user}/>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Components.Timeline user={user} />
        <Components.Sidebar user={user} />
      </div>
    </div>
  );
}

export default Dashbaord;
