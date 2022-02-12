import PropTypes from "prop-types";
function PostAttachmentComponent({ attachments, setActive = e=>{} }) {
  if (!attachments) return null;
  return (
    <div
      onClick={() => {
        setActive(true);
      }}
      className="flex place-content-center items-center w-full bg-gray-200"
    >
      {attachments.map((attachment, index) => {
        return <img className=" h-fit" style={{maxHeight:'640px'}} key={index} src={attachment} alt="" />;
      })}
    </div>
  );
}

PostAttachmentComponent.prototype = {
  attachments: PropTypes.array.isRequired,
};
export default PostAttachmentComponent;
