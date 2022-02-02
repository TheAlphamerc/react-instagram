import { PostConverter, PostModel, Profile } from "../../models/index";
import { useRef, useState } from "react";

import FeedService from "../../services/feed";
import FirebaseStorageService from "../../services/firebase-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../model/model";
import { Spinner } from "../loader";
import { UserAvatar } from "../index";
import cx from "classnames";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CreatePostModelComponent({ user, active, setActive = (e) => {} }) {
  const pictureRef = useRef();
  const [picture, setPicture] = useState();
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [location, setLocation] = useState("");

  const IsSubmittable = picture != null && picture != undefined;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await uploadFile(async (attachmentUrl) => {
        try {
          await FeedService.createPost(
            new PostModel({
              userId: "",
              caption: caption,
              location: location,
              attachments: [attachmentUrl],
              likes: [],
              comments: [],
              createdBy: Profile.postUser(
                user.userId,
                user.fullname,
                user.username,
                user.avatar
              ),
              createdAt: Date.now(),
            })
          );
        } catch (error) {
          setLoading(false);
        }
        setLoading(false);
        setActive(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const uploadFile = async (onFileUpload = (url) => {}) => {
    const pathname = `${user.username}/post-image}`;
    // const file = pictureRef.current.files[0];
    try {
      await FirebaseStorageService.uploadFile(
        file,
        pathname,
        (fileUrl) => {
          console.log("Start saving post");
          onFileUpload(fileUrl);
        },
        (error) => {
          console.log("Getting eror while creating post", error);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error - 2", error);
      setLoading(false);
    }
  };

  function clearParams() {
    setPicture(null);
    setCaption("");
    setLoading(false);
  }
  return (
    <Modal
      width={740}
      className="h-4/6"
      active={active}
      setActive={(e) => {
        setActive(e);
        clearParams();
      }}
      padding={false}
    >
      <div className="">
        <div className="flex flex-row justify-between p-2 px-4 border-b  ">
          <p className="">Create Post</p>
          {IsSubmittable && !loading ? (
            <button
              disabled={!IsSubmittable}
              onClick={onSubmit}
              className={cx("text-sm font-semibold text-blue-400", {
                "bg-gray-100": !IsSubmittable,
              })}
            >
              Share
            </button>
          ) : loading ? (
            <Spinner />
          ) : null}
        </div>
        <div className="h-full flex flex-col">
          <input
            type="file"
            ref={pictureRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              try {
                setFile(e.target.files[0]);
                setPicture(URL.createObjectURL(e.target.files[0]));
              } catch (error) {
                console.error("Error - 1", error);
              }
            }}
          />
          {picture ? (
            <Editor
              user={user}
              picture={picture}
              caption={caption}
              setCaption={setCaption}
              setPicture={setPicture}
              setLocation={setLocation}
            />
          ) : (
            <ChooseImage
              setFile={setFile}
              pictureRef={pictureRef}
              setPicture={setPicture}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CreatePostModelComponent;

function ChooseImage({ pictureRef, setFile, setPicture }) {
  const hasFiles = ({ dataTransfer: { types = [] } }) =>
    types.indexOf("Files") > -1;

  return (
    <div
      onDrop={(e) => {
        e.preventDefault();

        if (e.dataTransfer.items[0].kind === "file") {
          var file = e.dataTransfer.items[0].getAsFile();
          if (file.type.match("image/*")) {
            setFile(file);
            setPicture(URL.createObjectURL(file));
          }
        }
      }}
      onDragOverCapture={(e) => {
        if (hasFiles(e)) {
          e.preventDefault();
        }
      }}
      className="flex flex-col justify-center place-items-center p-24"
    >
      <ImageIcon />

      <p className="text-lg m-8">Drag photos and videos here</p>
      <button
        className="bg-blue-500 text-white rounded px-2 py-2"
        type="input"
        onClick={() => {
          pictureRef.current.click();
        }}
      >
        Select From Computer
      </button>
    </div>
  );
}

function Editor({
  user,
  picture,
  setPicture,
  setCaption,
  caption,
  setLocation,
}) {
  const endRef = useRef();
  let rows = caption.split("\n").length;
  rows = rows > 3 ? (rows > 5 ? 5 : rows) : 3;
  return (
    <div className="grid grid-cols-5 h-full  ">
      {/* Image */}
      {
        <div className="col-span-3 flex aspect-square  bg-gray-100  items-center">
          <div className="relative w-full flex place-content-center h-full">
            <img className="object-cover" src={picture} alt="" />

            <div
              onClick={() => {
                setPicture(null);
              }}
              style={{ backgroundColor: "#3338" }}
              className="absolute flex justify-center items-center  right-2 top-2 h-8 w-8 rounded-full"
            >
              <FontAwesomeIcon
                className="text-white cursor-pointer"
                icon={faTimes}
              />
            </div>
          </div>
        </div>
      }

      {/* Editor */}
      {
        <div className="col-span-2 flex flex-col border-l p-4 space-y-2 bg-white">
          <div className="flex items-center space-x-2">
            <UserAvatar
              className=" h-8 w-8 text-sm"
              picture={user.avatar}
              fullname={user.fullname}
            />
            <p className="text-center font-bold text-black">{user.username}</p>
          </div>
          <textarea
            type="text"
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            className=" px-4 py-2 w-full flex-grow block focus:outline-none resize-none"
            rows={6}
            placeholder="Enter description here.."
          />

          <label className="flex flex-row border p-2 rounded place-items-center">
            <input
              className="flex-grow outline-none"
              name="creation-location-input"
              placeholder="Add Location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            />
            <LocationIcon />
          </label>
        </div>
      }
    </div>
  );
}

function ImageIcon() {
  return (
    <svg
      aria-label="Icon to represent media such as images or videos"
      color="#262626"
      fill="#262626"
      height="77"
      role="img"
      viewBox="0 0 97.6 77.3"
      width="96"
    >
      <path
        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
        fill="currentColor"
      ></path>
      <path
        d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
        fill="currentColor"
      ></path>
      <path
        d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      className="flex-none"
      aria-label="Add Location"
      color="#8e8e8e"
      fill="#8e8e8e"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="M12.053 8.105a1.604 1.604 0 101.604 1.604 1.604 1.604 0 00-1.604-1.604zm0-7.105a8.684 8.684 0 00-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 001.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0012.053 1zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0113.417 0c0 3.985-3.944 8.538-6.709 11.002z"></path>
    </svg>
  );
}
