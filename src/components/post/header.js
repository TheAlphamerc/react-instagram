import { Link } from "react-router-dom";
import { UserAvtar } from "..";
function HeaderComponent({ user }) {
  return (
    <div className="flex border-b border-gray-300 h-4 px-2 py-6">
      <Link to={`/p/${user.username}`} className="flex items-center space-x-2">
        <UserAvtar
          className="h-8 w-8 text-xs"
          avatar={user.avatar}
          fullname={user.fullname}
        />
        <p className="text-sm font-bold">{user.username}</p>
      </Link>
    </div>
  );
}

export default HeaderComponent;
