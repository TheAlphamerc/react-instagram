import React, { useEffect, useMemo, useState } from "react";
import HeaderComponent from "../header";
import PostAttachmentComponent from "../post-attachment";
import { withSession } from "../../../context/session";
import PostFooterComponent from "../footer";
import CommentsComponent from "../footer/comment/comments";
import ExpandedText from "../../expended-text";

export default function PostDetailComponent({
  user,
  post,
  onAction = (actionType) => {},
}) {
  return (
    <div className="border rounded mx-auto">
      <div className="grid grid-cols-2 mx-auto" style={{ minHeight: "600px" }}>
        <PostAttachmentComponent attachments={post.attachments} />
        <div className="flex flex-col justify-between ">
          <div className="flex-0">
            <HeaderComponent user={user} post={post} onAction={onAction} />
          </div>
          <div className="p-4 flex-1">
            <CommentsComponent
              displayAllComments
              allComments={post.comments}
              postedAt={post.createdAt}
            />
          </div>
          <div className="border-t border-gray-200 p-4">
            <PostFooterComponent user={user} post={post} onAction={onAction} />
          </div>
        </div>
      </div>
    </div>
  );
}
