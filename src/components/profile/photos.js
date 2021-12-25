import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as emptyHeart,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";

function Photos({ photos, user }) {
  return (
    <div className="h-16 border-t border-gray-400 mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ? (
          <Skeleton height={100} width={100} count={3} />
        ) : photos.length > 0 ? (
          photos.map((post, index) => (
            <Photo key={index} user={user} post={post} />
          ))
        ) : null}
      </div>
      {!photos ||
        (photos.length === 0 && <p className="text-center">No Post Yet</p>)}
    </div>
  );
}

function Photo({ post, user }) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.userId));
  return (
    <div className="relative group">
      <div className="aspect-square ">
        <img
          className="aspect-square object-cover h-full"
          src={post.attachments[0]}
          alt={post.caption}
        />
      </div>
      <div
        style={{ opacity: 0.4 }}
        className="absolute hidden hover:block bg-black bottom-0 left-0  z-10 w-full justify-center space-x-6 items-center h-full bg-black-faded group-hover:flex"
      >
        <div className="flex items-center opacity-100">
          <FontAwesomeIcon
            className={cx("cursor-pointer ", {
              "text-white": isLiked,
              "text-gray-500": !isLiked,
            })}
            icon={faHeart}
          />
          <p className="flex items-center ml-1 text-white font-bold">
            {post.likes.length}
          </p>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon
            className="text-white select-none cursor-pointer"
            icon={faCommentDots}
          />
          <p className="flex items-center ml-1 text-white font-bold">
            {post.likes.length}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Photos;
