import { useEffect, useState } from "react";
import { PostModel } from "../models/post";
import FeedService from "../services/feed";
import UsePost from "./use-post";

function UserFeeds(user: any): PostModel[] | undefined {
  const [feed, setFeeds] = useState<Array<PostModel>>();
  const updatedPost = UsePost();
  const [lastId, setLastId] = useState<string>("");
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const pageLimit = 10;

  /// Fetch feeds
  useEffect(() => {
    async function getTimelineFeed() {
      var following: string[] = user != undefined ? user.following ?? [] : [];
      following.push(user.userId);
      const list = await FeedService.getTimeLineFeed(
        following,
        lastId,
        pageLimit
      );
      if (list.length > 0) {
        setLastId(list.reverse()[0].createdAt);

        list.sort((a, b) => b.createdAt - a.createdAt);

        setHasMoreData(list && list.length == pageLimit);
        if (feed == undefined) {
          setFeeds(list);
        } else {
          var newList = feed.concat(list);
          setFeeds(newList);
        }
      }
      setLoadMore(false);
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
    if (updatedPost != undefined) {
      const list = feed;
      list?.unshift(updatedPost);
      setFeeds(list);
    }
  }, [updatedPost, feed]);

  /// Trigger  load more effect
  useEffect(() => {
    // create callback
    const callBack = () => {
      if (
        window.innerHeight + window.scrollY + 100 >=
        document.body.offsetHeight
      ) {
        // Fetch more post feed when user scrolls to bottom
        setLoadMore(true);
      }
    };

    if (!loadMore) {
      console.log("bottom reached");
      window.addEventListener("scroll", callBack);
    }
    return () => {
      window.removeEventListener("scroll", callBack);
    };
  }, [user]);

  return feed;
}

export default UserFeeds;
