import cx from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
function SettingsSidebarComponent({ className }) {
  // const [, set] = useState();
  return (
    <aside className="p-4 border bg-white select-none hidden lg:block ">
      <LinkButton isActive={true} to={location.pathname} label="Edit" />
      <LinkButton to={"#"} label="Change Password" />
      <LinkButton to={"#"} label="Email and SMS" />
      <LinkButton to={"#"} label="Push Notifications" />
    </aside>
  );
}

function LinkButton({ label, to, isActive = false }) {
  return (
    <div
      className={cx("px-4 hover:bg-gray-200 py-2 rounded mb-1", {
        "bg-gray-200 font-semibold": isActive,
      })}
    >
      <QueryNavLink to={to}>{label}</QueryNavLink>
    </div>
  );
  function QueryNavLink({ to, ...props }) {
    return <NavLink to={to + location.search} {...props} />;
  }
}
export default SettingsSidebarComponent;
