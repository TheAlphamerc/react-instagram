import { useEffect, useState } from "react";
import { PostModel } from "../models/post";
import { getTimeLineFeed } from "../services/feed";
import UsePost from "./use-post";

function UserFeeds(user: any): PostModel[] {

  const [feed, setFeeds] = useState<any>({});
  const updatedPost = UsePost();
  var following: string[] = user != undefined ? user.following ?? [] : [];

  useEffect(() => {
    async function getTimelineFeed() {
      following.push(user.userId);
      const list = await getTimeLineFeed(following);
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
  }, [updatedPost]);

  return feed;
}


export default UserFeeds;
