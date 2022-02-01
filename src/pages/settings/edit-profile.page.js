import React, { useEffect, useState, useRef, useMemo } from "react";
import cx from "classnames";
import { withSession } from "../../context/session";
import { UserAvatar } from "../../components";
import { Spinner } from "../../components/loader";
import ProfileService from "../../services/profile";

function EditProfilePageComponent({ user }) {
  const email = user.email;
  const [name, setName] = useState(user.fullname);
  const [avatar, setAvatar] = useState(user.avatar);
  const [website, setWebsite] = useState(user.website ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nameRef = useRef();
  const websiteRef = useRef();
  const bioRef = useRef();

  // Save profile
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await ProfileService.updateProfile(
        user.userId,
        name,
        bio,
        website,
        avatar
      );
      setSuccess(true);
      console.log("profile updated");
    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="h-full flex flex-col p-4 border-r border-t border-b  bg-white select-none mx-auto lg:mx-0 w-5/6 lg:w-full">
      <div className="flex flex-row mt-6 md:w-5/6 md:mx-auto">
        <div className="md:w-32 flex justify-end items-center ">
          <UserAvatar
            avatar={user.avatar}
            fullname={user.fullname}
            className="w-12 h-12 mr-4"
          />
        </div>
        <div>
          <h1 className="font-semibold">{user.username}</h1>
          <p className="font-semibold text-blue-500 text-sm">
            Change profile photo
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} method="post">
        <div className="grid grid-cols-6  md:items-center md:w-5/6 mt-6 mx-auto space-y-3">
          <aside className="col-span-6 md:col-span-1 items-start">
            <label className="font-medium">Fullname</label>
          </aside>
          <div className="col-span-6 md:col-span-5 justify-items-stretch">
            <input
              key="name"
              placeholder="Name"
              aria-label="Enter your name"
              type="text"
              autoFocus={true}
              className={cx("py-2 px-2 w-full border rounded", {})}
              autoComplete="off"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onFocus={(e) => {}}
            />
          </div>
        </div>
        <InputControl
          label={"Username"}
          defaultValue={user.username}
          disabled={true}
        />
        <InputControl
          label={"Email"}
          defaultValue={user.email}
          disabled={true}
        />
        <div className="grid grid-cols-6  md:items-center md:w-5/6 mt-6 mx-auto space-y-3">
          <aside className="col-span-6 md:col-span-1 items-start">
            <label className="font-medium">Bio</label>
          </aside>
          <div className="col-span-6 md:col-span-5 justify-items-stretch">
            <textarea
              key="bio"
              placeholder="Bio"
              rows={3}
              aria-label="Enter your bio"
              type="text"
              autoFocus={true}
              className={cx("py-2 px-2 w-full border rounded", {})}
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-6  md:items-center md:w-5/6 mt-6 mx-auto space-y-3">
          <aside className="col-span-6 md:col-span-1 items-start">
            <label className="font-medium">Website</label>
          </aside>
          <div className="col-span-6 md:col-span-5 justify-items-stretch">
            <input
              key="website"
              placeholder="Website"
              aria-label="Enter your website url"
              type="url"
              autoFocus={true}
              className={cx("py-2 px-2 w-full border rounded", {})}
              autoComplete="off"
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-6  md:items-center md:w-5/6 mt-6 mx-auto space-y-3">
          <div className="col-span-6 md:col-span-1 items-start"></div>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400 w-28"
            onClick={handleSave}
          >
            {loading ? <div>{<Spinner white={true} />}</div> : <div>Save</div>}
          </button>
        </div>
      </form>
      {error && <p className="text-sm text-red-400 mt-32">{error}</p>}
    </article>
  );

  function InputControl({
    ref,
    label,
    defaultValue,
    disabled = false,
    description,
    onChange = () => {},
  }) {
    // const [value, setValue] = useState(defaultValue);
    const value = useMemo(() => defaultValue, [defaultValue]);
    return (
      <div className="grid grid-cols-6  md:items-center md:w-5/6 mt-6 mx-auto space-y-3">
        <aside className="col-span-6 md:col-span-1 items-start">
          <label className="font-medium">{label}</label>
        </aside>
        <div className="col-span-6 md:col-span-5 justify-items-stretch">
          <input
            key={label}
            ref={ref}
            placeholder="Name"
            aria-label="Enter your name"
            type="text"
            // autoFocus={true}
            disabled={disabled}
            className={cx("py-2 px-2 w-full border rounded", {
              "bg-gray-100": disabled,
            })}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onFocus={(e) => {}}
          />
          {description && <div>{description}</div>}
        </div>
      </div>
    );
  }
}

const EditProfilePage = withSession(EditProfilePageComponent);
export default EditProfilePage;
