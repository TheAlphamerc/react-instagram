import { faHeart } from "@fortawesome/free-solid-svg-icons";
import PostActionComponent from "../post-action";
import {
  faHeart as emptyHeart,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import cx from "classnames";
import FeedService from "../../../services/feed";
import AddCommentComponent from "./add-comment/add-comment.js";
import CommentsComponent from "./comment/comments";
import ExpandedText from "../../expended-text";
import { PostAction } from "..";

function PostFooterComponent({ user, post, onAction = (actionType) => {} }) {
  const [comments, setComments] = useState(post.comments);
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="">
      <PostActionComponent
        user={user}
        post={post}
        onAction={onAction}
        handleFocus={handleFocus}
      />
      <span className="font-bold">{post.createdBy.fullname}&nbsp;</span>

      <AddCommentComponent
        user={user}
        onNewCommentAdd={(newComment) =>
          onAction(PostAction.addComment, newComment)
        }
        commentInput={commentInput}
      />
    </div>
  );
}

export default PostFooterComponent;
