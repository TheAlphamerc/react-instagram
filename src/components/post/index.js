import HeaderComponent from './header';
import PostAttachmentComponent from './post-attachment';
function PostComponent({ post }) {
  return <div className="rounded col-span-4 border bg-white border-gray-200 ">
    <HeaderComponent user={post.createdBy} />
    <PostAttachmentComponent attachments={post.attachments} />
    <p>
        {post.caption}
        </p>
  </div>;
}

export default PostComponent;
