import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostComponent from "../post";
import UserFeeds from "../../hook/use-feed";

function Timeline({ user }) {
  const feed = UserFeeds(user);

  return (
    <div className="container col-span-2">
      {!feed ? (
        <div className="">
          <Skeleton count={10} height={220} />
        </div>
      ) : feed.length > 0 ? (
        <div>
          <div className=" grid gap-5">
            {feed.map((post, index) => (
              <PostComponent key={index} post={post} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Timeline;
