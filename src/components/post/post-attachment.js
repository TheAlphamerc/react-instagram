import PropTypes from "prop-types";
function PostAttachmentComponent({ attachments }) {
  if (!attachments) return null;
  return (
    <div className="flex place-content-center items-center w-full">
      {attachments.map((attachment, index) => {
        return <img className="h-fit" key={index} src={attachment} alt="" />;
      })}
    </div>
  );
}

PostAttachmentComponent.prototype = {
  attachments: PropTypes.array.isRequired,
};
export default PostAttachmentComponent;
