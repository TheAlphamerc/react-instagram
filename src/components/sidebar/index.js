// import { useContext, useState, useEffect } from "react";
// import FirebaseContext from "../../context/firebase";
// import UserContext from "../../context/user";
// import * as ROUTES from "../../constants/routes";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/reac t-fontawesome";
import useUser from "../../hook/use-user";
import User from "./user";
import Suggestions from "./suggestions";

// import { faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


function Sidebar() {
 const user = useUser();
 console.log("Render Sidebar");
  return (
    <div className="p-4">
      <User user={user}/>
      <Suggestions userId={user.userId}/>
    </div>
  );
}

export default Sidebar;
 