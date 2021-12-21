import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import cx from "classnames";

function PostActionComponent({ user,post, onAction = (actionType) => {} }) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.userId));
  return (
    <div className="p-2 border-t">
      
        <button
          onClick={() => {
              onAction("like");
              setIsLiked(!isLiked);
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
    </div>
  );
}

export default PostActionComponent;
