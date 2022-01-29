import { useState } from "react";
import { PostModel, Profile } from "../../../../models/index";

function AddCommentComponent({
  user,
  commentInput,
  onNewCommentAdd = (e) => {},
}) {
  const [caption, setCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (caption.length >= 1) {
      const comment = new PostModel({
        id: "",
        caption: caption,
        createdBy: Profile.postUser(
          user.userId,
          user.fullname,
          user.username,
          user.avatar ?? ""
        ),
        createdAt: Date.now(),
      });
      onNewCommentAdd(comment);
      setCaption("");
    }
  };
  return (
    <div className=" border border-gray-200 mt-2">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex justify-between pl-0 pr-5"
      >
        <input
          type="text"
          className="text-sm text-gray-500 w-full mr-3 py-2 px-4"
          name="add-caption"
          placeholder="Add a caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-400
           ${!caption && "opacity-25"}`}
          onClick={handleSubmit}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddCommentComponent;
