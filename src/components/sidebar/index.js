import User from "./user";
import Suggestions from "./suggestions";


function Sidebar({user}) {
 
  return (
    <div className="p-4">
      <User user={user}/>
      <Suggestions userId={user?.userId}/>
    </div>
  );
}

export default Sidebar;
 