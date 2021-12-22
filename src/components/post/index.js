import HeaderComponent from "./header";
import PostAttachmentComponent from "./post-attachment";
import PostActionComponent from "./post-action";
import { withSession } from "../../context/session";
import { togglePostLike } from "../../services/feed";
import PostFooterComponent from "./footer";

function PostComponent({ user, post }) {
  const onAction = async (actionType) => {
    switch (actionType) {
      case "like":
        await togglePostLike(post, user.userId);
        break;
      case "comment":
        // post.comment();
        break;
      default:
        break;
    }
  };
  return (
    <div className="rounded col-span-4 border bg-white border-gray-200 ">
      <HeaderComponent user={post.createdBy} />
      <PostAttachmentComponent attachments={post.attachments} />

      <PostActionComponent user={user} post={post} onAction={onAction} />
      <PostFooterComponent post={post} />
    </div>
  );
}

export default withSession(PostComponent);
