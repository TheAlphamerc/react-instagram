import { Link } from "react-router-dom";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

function CommentsComponent({ allComments, postedAt }) {
  const [comments, setComments] = useState(allComments);
  console.log("postedAt", postedAt);
  return (
    <div>
      <div className="pt-1">
        {comments.length >= 3 && (
          <p className="text-sm-text-gray-bae mb-1 cursor-pointer">
            View all {comments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((comment, index) => (
          <p key={index} className="mb-1">
            <Link to={`${comment.createdBy.fullname}}`}>
              <span className="mr-1 text-sm  font-bold">
                {" "}
                {comment.createdBy.fullname}
              </span>
            </Link>
            <span className="text-sm text-gray-500">{comment.caption}</span>
          </p>
        ))}
        <p className="text-gray-500 upparcase text-xs">
          posted {formatDistanceToNow(postedAt)} ago
        </p>
      </div>
    </div>
  );
}

export default CommentsComponent;
