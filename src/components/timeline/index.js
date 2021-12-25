import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostComponent from "../post";
import UserFeeds from "../../hook/use-feed";

function Timeline({ user }) {
  const feed = UserFeeds(user);

  return (
    <div className="container col-span-2">
      {!feed ? (
        <Skeleton count={10} height={220} />
      ) : feed.length > 0 ? (
        <div>
          <div className=" grid gap-5">
            {feed.map((post, index) => (
              <PostComponent key={index} post={post} />
            ))}
          </div>
        </div>
      ) : null}
      {!feed ||
        (feed.length === 0 && <p className="text-center">No Post Yet</p>)}
    </div>
  );
}

export default Timeline;
