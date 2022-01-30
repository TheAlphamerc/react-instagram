import HeaderComponent from "./header";
import PostAttachmentComponent from "./post-attachment";
import { withSession } from "../../context/session";
import PostFooterComponent from "./footer";

function PostComponent({ user, post }) {
  return (
    <div className="rounded bg-white  sm:mx-20 lg:mx-0">
      <HeaderComponent user={user} post={post} />
      <PostAttachmentComponent attachments={post.attachments} />
      <PostFooterComponent user={user} post={post} />
    </div>
  );
}

export default withSession(PostComponent);
