import "react-loading-skeleton/dist/skeleton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostComponent from "../post";
import Skeleton from "react-loading-skeleton";
import UserFeeds from "../../hook/use-feed";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function Timeline({ user,createPostRef }) {
  const feed = UserFeeds(user);

  return (
    <div className="col-span-2 overflow-y-scroll">
      {!feed ? (
        <Skeleton count={10} height={220} />
      ) : feed.length > 0 ? (
        <div className="pt-6 pb-4">
          <div className="grid gap-5">
            {feed.map((post, index) => (
              <PostComponent key={index} post={post} />
            ))}
          </div>
        </div>
      ) : null}
      {!feed || <NoPostComponent feed={feed} createPostRef={createPostRef}/>}
    </div>
  );
}

function NoPostComponent({ feed,createPostRef }) {
  return (
    feed.length === 0 && (
      <div className="flex flex-col mt-32 items-center text-center justify-center">
        <FontAwesomeIcon
          size="2x"
          className="h-44 cursor-pointer"
          icon={faCamera}
          onClick={()=>{
            createPostRef.current.click();
          }}
        />
        <p className="text-3xl text-gray-600">No Posts Yet</p>
      </div>
    )
  );
}
export default Timeline;
