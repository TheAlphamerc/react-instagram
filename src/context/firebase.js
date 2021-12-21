import { createContext } from "react";

import { firebase,db } from "../lib/firebase";

const FirebaseContext = createContext(null);
FirebaseContext.displayName = "FirebaseContext";

export { FirebaseContext };

export default ({ children }) => {
  return (
    <FirebaseContext.Provider value={(firebase, db)}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const withFirebase = (Component) => (props) =>
  (
    <FirebaseContext.Consumer>
      {(firebase, db) => <Component firebase={firebase} db={db} {...props} />}
    </FirebaseContext.Consumer>
  );
