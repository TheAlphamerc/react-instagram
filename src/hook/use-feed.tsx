import { useEffect, useState } from "react";
import { PostModel } from "../models/post";
import FeedService from "../services/feed";
import UsePost from "./use-post";

function UserFeeds(user: any): PostModel[] {

  const [feed, setFeeds] = useState<any>();
  const updatedPost = UsePost();

  useEffect(() => {
    async function getTimelineFeed() {
      var following: string[] = user != undefined ? user.following ?? [] : [];
      following.push(user.userId);
      const list = await FeedService.getTimeLineFeed(following);
      if (list.length > 0) {
        list.sort((a, b) => b.createdAt - a.createdAt);
      }
      setFeeds(list);
    }

    if (user != undefined && user.userId != undefined) {
      getTimelineFeed();
    } else {
      setFeeds({});
    }
  }, [user]);

  // Update feed if [post] is updated
  useEffect(() => {
    if (updatedPost != undefined) {
      const list = feed;
      list.unshift(updatedPost);
      setFeeds(list);
    }
  }, [updatedPost,feed]);

  return feed;
}


export default UserFeeds;
