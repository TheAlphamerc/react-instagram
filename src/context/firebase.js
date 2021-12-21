import { createContext } from "react";

import { firebase } from "../lib/firebase";

const FirebaseContext = createContext(null);
FirebaseContext.displayName = "FirebaseContext";

export { FirebaseContext };

export default ({ children }) => {
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const withFirebase = (Component) => (props) =>
  (
    <FirebaseContext.Consumer>
      {(firebase) => <Component firebase={firebase} {...props} />}
    </FirebaseContext.Consumer>
  );
