import HeaderComponent from "./header";
import PostAttachmentComponent from "./post-attachment";
import { withSession } from "../../context/session";
import PostFooterComponent from "./footer";
import { Modal } from "../model/model";
import PostDetail from "./detail/post-detail";
import { useState } from "react";
import ExpandedText from "../expended-text";
import CommentsComponent from "./footer/comment/comments";

function PostComponent({ user, post }) {
  const [active, setActive] = useState();
  return (
    <div className="border rounded bg-white sm:mx-20 lg:mx-0">
      <HeaderComponent user={user} post={post} />
      <PostAttachmentComponent
        attachments={post.attachments}
        setActive={setActive}
      />
      <div className="p-4">
        <ExpandedText text={post.caption} />
        <span className="px-2 font-normal"></span>
        <CommentsComponent
          allComments={post.comments}
          postedAt={post.createdAt}
        />
        <PostFooterComponent user={user} post={post} />
      </div>
      <Modal padding={false} width={1536} active={active} setActive={setActive}>
        <PostDetail user={user} post={post} />
      </Modal>
    </div>
  );
}

export default   withSession(PostComponent);
