import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "..";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostMenuComponent, {
  Action,
  ActionLevel,
} from "../model/menu-action.component";
import FeedService from "../../services/feed";
import ProfileService from "../../services/profile";
import { PostAction } from ".";

export default function HeaderComponent({
  user,
  post,
  onAction = (actionType) => {},
}) {
  const [active, setActive] = useState(false);
  const isMyPost = post.createdBy.userId === user.userId ?? false;

  return (
    <div className="flex justify-between place-items-center border-b border-gray-300 h-4 py-8 px-6">
      <Link
        to={`/p/${post.createdBy.username}`}
        className="flex items-center space-x-2"
      >
        <UserAvatar
          className="h-8 w-8 text-xs"
          avatar={post.createdBy.avatar}
          fullname={post.createdBy.fullname}
        />
        <div>
          <p className="text-sm font-bold">{post.createdBy.username}</p>
          <p className="text-xs">{post.location}</p>
        </div>
      </Link>
      <button
        className="p-2 hover:bg-gray-100 rounded-full w-10 h-10"
        onClick={() => {
          setActive(!active);
        }}
      >
        <FontAwesomeIcon icon={faEllipsisH} />
        <PostMenuComponent
          active={active}
          setActive={setActive}
          actions={[
            isMyPost
              ? new Action(
                  "Delete",
                  () => onAction(PostAction.delete),
                  ActionLevel.alert
                )
              : new Action(
                  "Report",
                  () => onAction(PostAction.report),
                  ActionLevel.alert
                ),
            user.following.includes(post.createdBy.userId)
              ? new Action(
                  "Unfollow",
                  () => onAction(PostAction.unfollow),
                  ActionLevel.alert
                )
              : isMyPost
              ? null
              : new Action(
                  "Follow",
                  () => onAction(PostAction.follow),
                  ActionLevel.primary
                ),
            new Action("Cancel", () => {}),
          ]}
        />
      </button>
    </div>
  );
}
