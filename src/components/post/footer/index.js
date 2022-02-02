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
import CommentsComponent from "./comment/comments";
import AddCommentComponent from "./add-comment/add-comment.js";
import ExpandedText from "../../expended-text";

function PostFooterComponent({ user, post }) {
  const [comments, setComments] = useState(post.comments);
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  const onAction = async (actionType, data) => {
    try {
      switch (actionType) {
        case "like":
          await FeedService.togglePostLike(post, user.userId);
          break;
        case "newComment":
          FeedService.addComment(data, post.id);
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
    <div className="border-t border-gray-200 p-4">
      <PostActionComponent
        user={user}
        post={post}
        onAction={onAction}
        handleFocus={handleFocus}
      />
      <span className="font-bold">{post.createdBy.fullname}&nbsp;</span>
      <ExpandedText text={post.caption} />
      <span className="px-2 font-normal"></span>
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
