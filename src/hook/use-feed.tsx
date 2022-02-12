import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../context/session";
import { PostModel } from "../models/post";
import FeedService from "../services/feed";
import UsePost from "./use-post";
import useScroll from "./use-scroll";

function UserFeeds(): {
  feed: PostModel[] | undefined;
  isLoading: boolean;
} {
  const [feed, setFeeds] = useState<Array<PostModel>>();
  const querySnapshot = UsePost();
  const [lastId, setLastId] = useState<string>("");
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const pageLimit = 10;

  const user = useContext<any>(SessionContext);

  useScroll(hasMoreData, loadMore, isLoading, setLoadMore);

  /// Fetch feeds
  useEffect(() => {
    async function getTimelineFeed() {
      setIsLoading(true);
      let following: string[] = user != undefined ? user.following ?? [] : [];
      const list = await FeedService.getTimeLineFeed(
        [user.userId, ...following],
        lastId,
        pageLimit
      );
      if (list.length > 0) {
        setLastId(list.reverse()[0].createdAt);

        list.sort((a, b) => b.createdAt - a.createdAt);

        setHasMoreData(list && list.length == pageLimit);
        if (feed === undefined) {
          setFeeds(list);
        } else {
          var newList = feed.concat(list);
          setFeeds(newList);
        }
      } else {
        setFeeds([]);
      }
      setLoadMore(false);
      setIsLoading(false);
    }

    if (user != undefined && user.userId != undefined) {
      if (hasMoreData) {
        getTimelineFeed();
      } else {
        console.log("No more data available");
      }
    } else {
      // setFeeds(undefined);
      console.log("Something went wrong");
    }
  }, [user, loadMore]);

  // Update feed if [post] is updated
  useEffect(() => {
    if (querySnapshot != undefined) {
      var list = feed;
      querySnapshot.docChanges().forEach((change) => {
        if (feed != undefined && list != undefined) {
          var isExist = feed.some((p) => p.id == change.doc.id);
          if (change.type === "added") {
            if (!isExist) {
              list?.unshift(change.doc.data());
              console.log("Post added: ", change.doc.data());
              setFeeds(list);
            }
          }
          if (change.type === "modified") {
            if (isExist) {
              let index = list?.findIndex((p) => p.id == change.doc.id);
              if (index != undefined) {
                list[index] = change.doc.data();
                setFeeds(list);
                console.log("Post Modified: ", change.doc.data());
              }
            }
          }
          if (change.type === "removed") {
            console.log("Post Removed: ", change.doc.data());
            if (isExist) {
              list?.filter((item) => item.id != change.doc.id);
              setFeeds(list);
            }
          }
        }
      });
    }
  }, [querySnapshot]);

  return { feed, isLoading: isLoading };
}

export default UserFeeds;
