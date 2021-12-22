import User from "./user";
import Suggestions from "./suggestions";


function Sidebar({user}) {
 
  return (
    <div className="pl-4">
      <div className="bg-white border p-4 mb-2">
        <User user={user} />
      </div>
      <Suggestions userId={user?.userId}/>
    </div>
  );
}

export default Sidebar;
 