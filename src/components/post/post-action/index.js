import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as emptyHeart,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import cx from "classnames";
import { PostAction } from "..";

function PostActionComponent({
  user,
  post,
  onAction = (actionType) => {},
  handleFocus,
}) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.userId));

  const [likes, setLike] = useState(post.likes.length);
  return (
    <div>
      <div className="flex items-center mb-1">
        <button
          onClick={() => {
            onAction(PostAction.like);
            setIsLiked(!isLiked);
            setLike(isLiked ? likes - 1 : likes + 1);
          }}
        >
          <FontAwesomeIcon
            size="lg"
            className={cx("cursor-pointer hover:text-gray-500", {
              "text-red-500": isLiked,
            })}
            icon={isLiked ? faHeart : emptyHeart}
          />
        </button>

        <div
          onClick={() => handleFocus()}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleFocus();
            }
          }}
        >
          <FontAwesomeIcon
            size="lg"
            className="mx-4 select-none cursor-pointer hover:text-gray-500"
            icon={faCommentDots}
          />
        </div>
      </div>
      <p className="text-sm">
        <span className="bold-semibold">{likes}&nbsp;</span>
        <span>{likes > 1 ? `likes` : `like`}</span>
      </p>
    </div>
  );
}

export default PostActionComponent;
