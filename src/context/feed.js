import { createContext } from "react";
import UserFeeds from "../hook/use-feed";

const FeedContext = createContext(null);
FeedContext.displayName = "FeedContext";

export { FeedContext };

export const withFeedProvider = (Component) => (props) => {
  const data = UserFeeds();
  return (
    <FeedContext.Provider value={data}>
      <Component {...props} />
    </FeedContext.Provider>
  );
};

export const withFeed = (Component) => (props) =>
  (
    <FeedContext.Consumer>
      {(data) => (
        <Component feed={data.feed} isLoading={data.isLoading} {...props} />
      )}
    </FeedContext.Consumer>
  );
