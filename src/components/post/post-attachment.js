import PropTypes from "prop-types";
function PostAttachmentComponent({ attachments }) {
  if (!attachments) return null;
  return (
    <div className="w-full">
      {attachments.map((attachment, index) => {
        return <img className="w-full h-fit" key={index} src={attachment} alt="" />;
      })}
    </div>
  );
}

PostAttachmentComponent.prototype = {
  attachments: PropTypes.array.isRequired,
};
export default PostAttachmentComponent;
