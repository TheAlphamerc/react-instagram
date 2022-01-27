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
        fullname.substring(0, 2).toUpperCase()
      ) : (
        ""
      )}
    </div>
  );
}

export default UserAvatar;
