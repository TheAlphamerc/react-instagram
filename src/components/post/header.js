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

function HeaderComponent({ user, post }) {
  const [active, setActive] = useState(false);
  const isMyPost = post.createdBy.userId === user.userId ?? false;

  const onAction = async (actionType) => {
    try {
      switch (actionType) {
        case "delete":
          await FeedService.deletePost(post, user.userId);
          break;
        case "report":
          await FeedService.reportPost(post, user);
          console.log("Reported");
          break;
        case "Unfollow":
          await ProfileService.updateMyFollowingUser(
            user.userId,
            post.createdBy.userId,
            true
          );
          console.log("user unfollowed");
          break;
        case "follow":
          await ProfileService.updateMyFollowingUser(
            user.userId,
            post.createdBy.userId,
            true
          );
          console.log("user followed");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-between place-items-center border-b border-gray-300 h-4 px-2 py-6">
      <Link
        to={`/p/${post.createdBy.username}`}
        className="flex items-center space-x-2"
      >
        <UserAvatar
          className="h-8 w-8 text-xs"
          avatar={post.createdBy.avatar}
          fullname={post.createdBy.fullname}
        />
        <p className="text-sm font-bold">{post.createdBy.username}</p>
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
                  () => onAction("delete"),
                  ActionLevel.alert
                )
              : new Action(
                  "Report",
                  () => onAction("report"),
                  ActionLevel.alert
                ),
            user.following.includes(post.createdBy.userId)
              ? new Action(
                  "Unfollow",
                  () => onAction("Unfollow"),
                  ActionLevel.alert
                )
              : isMyPost
              ? null
              : new Action(
                  "Follow",
                  () => onAction("follow"),
                  ActionLevel.primary
                ),
            new Action("Cancel", () => {}),
          ]}
        />
      </button>
    </div>
  );
}

export default HeaderComponent;
