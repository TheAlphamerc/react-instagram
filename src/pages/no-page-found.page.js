import { useEffect } from "react";
import Header from "../components/header";
import { withSession } from "../context/session";
function NoPageFound({ user }) {
  useEffect(() => {
    document.title = "Page not found - instagram";
  });
  return (
    <div className="bg-gray-100">
      <Header user={user} />
      <div className="flex h-screen items-center place-content-center  max-w-screen">
        <p className="text-center text-xl">No page found</p>
      </div>
    </div>
  );
}

export default withSession(NoPageFound);
