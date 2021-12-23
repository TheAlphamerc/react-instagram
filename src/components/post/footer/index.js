import { faHeart } from "@fortawesome/free-solid-svg-icons";
import PostActionComponent from "../post-action";
import {
  faHeart as emptyHeart,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import cx from "classnames";
import { togglePostLike, addComment } from "../../../services/feed";
import CommentsComponent from "./comment/comments";
import AddCommentComponent from "./add-comment/add-comment.js";

function PostFooterComponent({ user, post }) {
  const [comments, setComments] = useState(post.comments);
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  const onAction = async (actionType, data) => {
    try {
      switch (actionType) {
        case "like":
          await togglePostLike(post, user.userId);
          break;
        case "newComment":
          addComment(data, post.id);
          setComments([data, ...comments]);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="border-t border-gray-200 p-2">
      <PostActionComponent
        user={user}
        post={post}
        onAction={onAction}
        handleFocus={handleFocus}
      />
      <span className="font-bold">{post.createdBy.fullname}</span>
      <span className="px-2 font-normal">{post.caption}</span>
      <CommentsComponent allComments={comments} postedAt={post.createdAt} />
      <AddCommentComponent
        user={user}
        comments={[]}
        onNewCommentAdd={(newComment) => onAction("newComment", newComment)}
        commentInput={commentInput}
      />
    </div>
  );
}

export default PostFooterComponent;
