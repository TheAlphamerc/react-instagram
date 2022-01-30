import React, { useEffect } from "react";
import UseAuthListener from "../hook/use-auth-listener";
import UseUser from "../hook/use-user";

export const SessionContext = React.createContext(null);
SessionContext.displayName = "SessionContext";

export const withSessionProvider = (Component) => (props) => {
  const user = UseUser();
  return (
    <SessionContext.Provider value={user}>
      <Component {...props} />
    </SessionContext.Provider>
  );
};

export const withSession = (Component) => (props) => {
  return (
    <SessionContext.Consumer>
      {(user) => <Component user={user} {...props} />}
    </SessionContext.Consumer>
  );
};
