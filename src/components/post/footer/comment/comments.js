import { Link } from "react-router-dom";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import ExpandedText from "../../../expended-text";

function CommentsComponent({ allComments, postedAt, displayAllComments }) {
  const [showAllComments, setShowAllComments] = useState(
    displayAllComments ?? false
  );

  if (Array.isArray(allComments)) {
    allComments.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  return (
    <div>
      <div className="pt-1">
        {!showAllComments && allComments.length >= 3 && (
          <p
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-sm text-gray-400 mb-1 select-none cursor-pointer"
          >
            View all {allComments.length} Comments
          </p>
        )}
        {allComments
          .slice(0, showAllComments ? allComments.length : 3)
          .map((comment, index) => (
            <p key={index} className="mb-1">
              <Link to={`${comment.createdBy.fullname}}`}>
                <span className="mr-1 text-sm  font-bold">
                  {" "}
                  {comment.createdBy.fullname}
                </span>
              </Link>
              <ExpandedText
                className="text-sm text-gray-500"
                text={comment.caption}
              />
              {/* <span className="text-sm text-gray-500">{comment.caption}</span> */}
            </p>
          ))}
        <p className="text-gray-500 uppercase text-xs">
          posted {formatDistanceToNow(postedAt)} ago
        </p>
      </div>
    </div>
  );
}

export default CommentsComponent;
