import { useEffect, useState, useContext } from "react";
import { Profile } from "../models";
import { PostModel } from "../models/post";
import { getTimeLineFeed } from "../services/feed";

function UserFeeds(user: any): PostModel[] {
  
  const [feed, setFeeds] = useState<any>({});
  var following: string[] = user.following != undefined ? user.following ?? [] : [];

  useEffect(() => {
    async function getTimelineFeed() {
      following.push(user.userId);
      console.log("Get Timeline Feed");
      const list = await getTimeLineFeed(following);
      if(list.length > 0) {
        list.sort((a, b) =>b.createdAt - a.createdAt);
      }
      setFeeds(list);
    }

    if (user != undefined && user.userId != undefined) {
      getTimelineFeed();
    }
  }, [user]);

  return feed;
}


export default UserFeeds;
