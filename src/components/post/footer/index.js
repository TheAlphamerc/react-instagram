import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as emptyHeart,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import cx from "classnames";
import CommentsComponent from "./comment/comments";

function PostFooterComponent({ post }) {
  return (
    <div className=" p-2">
      <span className="font-bold">{post.createdBy.fullname}</span>
      <span className="px-2 font-normal">{post.caption}</span>
      <CommentsComponent allComments={post.comments} postedAt={post.createdAt} />
    </div>
  );
}

export default PostFooterComponent;
