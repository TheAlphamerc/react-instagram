import {
  faHeart as emptyHeart,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import cx from "classnames";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Photos({ photos, user }) {
  return (
    <div className="sm:border-t sm:mt-8  border-gray-300  pt-4">
      <div className="grid grid-cols-3 gap-2 sm:gap-8 mt-4 mb-12">
        {!photos ? (
          <Skeleton height={100} width={100} count={3} />
        ) : photos.length > 0 ? (
          photos.map((post, index) => (
            <Photo key={index} user={user} post={post} />
          ))
        ) : null}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <div className="flex flex-col mt-20 items-center text-center justify-center">
            <FontAwesomeIcon
              size="2x"
              className="h-44 cursor-pointer"
              icon={faCamera}
            />
            <p className="text-3xl text-gray-600">No Posts Yet</p>
          </div>
        ))}
    </div>
  );
}

function Photo({ post, user }) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.userId));
  return (
    <div className="relative group">
      <div className="aspect-square ">
        <img
          className="aspect-square object-cover h-full w-full border"
          src={post.attachments[0]}
          alt={'Image not Available'}
        />
      </div>
      <div
        className="transition ease-in delay-100 transition-colors duration-600 absolute hidden hover:block bg-black/50 bottom-0 left-0  z-10 w-full justify-center space-x-6 items-center h-full  group-hover:flex"
      >
        <div className="flex items-center">
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
