import cx from "classnames";

function UserAvatar({ avatar, fullname, className }) {
  return (
    <div
      className={cx(
        `rounded-full bg-gray-200 flex justify-center items-center font-semibold ${className}`
      )}
    >
      {avatar != null ? (
        <img className="rounded-full" alt="A" src={avatar} />
      ) : fullname ? (
        getInitials(fullname)
      ) : (
        ""
      )}
    </div>
  );
}

// Return Initials of name
function getInitials(name) {
  if (!name) {
    return "";
  }
  const names = name.split(" ");
  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }
  return `${names[0].substring(0, 1).toUpperCase()}${names[1].substring(
    0,
    1
  ).toUpperCase()}`;
}

// function getNameInitials(name){
//   if(name){
//     return name.substring(0,2).toUpperCase();
//   }
//   return "";
// } 
export default UserAvatar;
