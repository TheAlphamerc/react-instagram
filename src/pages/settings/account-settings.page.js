import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import { withSession } from "../../context/session";
import SettingsSidebarComponent from "./settings-sidebar.component";
import EditProfilePage from "./edit-profile.page";

function AccountSettingsComponent({ user }) {
  useEffect(() => {
    document.title = "Account Settings - Instagram";
  }, []);

  return (
    <div className="bg-gray-100 space-y-16 h-screen">
      <Header user={user} />
      <main className="py-4">
        <div className="grid grid-col-1 lg:grid-cols-4 justify-between max-w-screen-lg mx-auto overscroll-none h-screen ">
          <SettingsSidebarComponent />
          <div className="col-span-3 h-full">
            <Outlet />
            {/* <EditProfilePage /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
const AccountSettingsPage = withSession(AccountSettingsComponent);
export default AccountSettingsPage;
