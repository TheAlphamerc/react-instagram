import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as emptyHeart,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import cx from "classnames";

function PostActionComponent({
  user,
  post,
  onAction = (actionType) => {},
  handleFocus,
}) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.userId));

  const [likes, setLike] = useState(post.likes.length);
  return (
    <div className="flex items-center p-2 ">
      <button
        onClick={() => {
          onAction("like");
          setIsLiked(!isLiked);
          setLike(isLiked ? likes - 1 : likes + 1);
        }}
      >
        <FontAwesomeIcon
          className={cx("cursor-pointer ", {
            "text-red-500": isLiked,
            "text-gray-500": !isLiked,
          })}
          icon={isLiked ? faHeart : emptyHeart}
        />
      </button>
      <p className="text-sm font-bold ml-2">
        {" "}
        {likes === 1 ? `${likes} likes` : `${likes} like`}
      </p>
      <div
        onClick={() => handleFocus()}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleFocus();
          }
        }}
      >
        <FontAwesomeIcon
          className="mx-4 select-none cursor-pointer"
          icon={faCommentDots}
        />
      </div>
    </div>
  );
}

export default PostActionComponent;
