import HeaderComponent from "./header";
import PostAttachmentComponent from "./post-attachment";
import { withSession } from "../../context/session";
import PostFooterComponent from "./footer";

function PostComponent({ user, post }) {
  return (
    <div className="rounded bg-white">
      <HeaderComponent user={post.createdBy} />
      <PostAttachmentComponent attachments={post.attachments} />
      <PostFooterComponent user={user} post={post} />
    </div>
  );
}

export default withSession(PostComponent);
