import HeaderComponent from "./header";
import PostAttachmentComponent from "./post-attachment";
import { withSession } from "../../context/session";
import PostFooterComponent from "./footer";
import { Modal } from "../model/model";
import PostDetail from "./detail/post-detail";
import { useEffect, useState } from "react";
import ExpandedText from "../expended-text";
import CommentsComponent from "./footer/comment/comments";
import FeedService from "../../services/feed";
import ProfileService from "../../services/profile";

export const PostAction = Object.freeze({
  like: 1,
  addComment: 2,
  share: 3,
  delete: 4,
  report: 5,
  follow: 6,
  unfollow: 7,
});

function PostComponent({ user, post }) {
  const [active, setActive] = useState();

  const onAction = async (actionType, data) => {
    try {
      switch (actionType) {
        case PostAction.like:
          await FeedService.togglePostLike(post, user.userId);
          break;
        case PostAction.addComment:
          FeedService.addComment(data, post.id);
          break;
        case PostAction.delete:
          await FeedService.deletePost(post, user.userId);
          break;
        case PostAction.report:
          await FeedService.reportPost(post, user);
          console.log("Reported");
          break;
        case PostAction.follow:
          await ProfileService.updateMyFollowingUser(
            user.userId,
            post.createdBy.userId,
            false
          );
          console.log("user followed");
          break;
        case PostAction.unfollow:
          await ProfileService.updateMyFollowingUser(
            user.userId,
            post.createdBy.userId,
            true
          );
          console.log("user unfollowed");
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded bg-white sm:mx-20 lg:mx-0">
      <HeaderComponent user={user} post={post} onAction={onAction} />
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
        <PostFooterComponent user={user} post={post} onAction={onAction} />
      </div>
      <Modal padding={false} width={1536} active={active} setActive={setActive}>
        <PostDetail user={user} post={post} onAction={onAction} />
      </Modal>
    </div>
  );
}

export default withSession(PostComponent);
