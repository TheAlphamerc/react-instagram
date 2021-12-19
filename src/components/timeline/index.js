import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTimeLineFeed } from "../../services/feed";
import PostComponent from "../post";
import UserFeeds from "../../hook/use-feed";
import { Profile } from "../../models";

function Timeline({user}) {

  const feed = UserFeeds(user);

  return (
    <div className="container col-span-2">
      {!feed ? (
        <div className="">
          <Skeleton count={10} height={220} />
        </div>
      ) : feed.length > 0 ? (
        <div>
          <p className="font-bold text-gray-700 mb-2">Suggestions</p>
          <div className="mt-4 grid gap-5">
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
