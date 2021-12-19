import { Link } from "react-router-dom";
function HeaderComponent({ user }) {
  return (
    <div className="flex border-b border-gray-300 h-4 px-4 py-8">
      <div className="flex ">
        <Link to={`/p/${user.username}`} className="flex items-center">
          <img
            className="w-8 h-8 rounded-full mr-4"
            src={user.avatar}
            alt="avatar"
          />
            <p className="text-sm font-bold">{user.username}</p>
        </Link>
      </div>
    </div>
  );
}

export default HeaderComponent;
