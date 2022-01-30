import React, { useEffect, useState } from "react";
import cx from "classnames";
import { withSession } from "../../context/session";
import { UserAvatar } from "../../components";
import { Spinner } from "../../components/loader";
import ProfileService from "../../services/profile";
function EditProfilePageComponent({ user }) {
  const email = user.email;
  const [name, setName] = useState(user.fullname);
  const [avatar, setAvatar] = useState(user.avatar);
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Save profile
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await ProfileService.updateProfile(
        user.userId,
        name,
        website,
        bio,
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
      <div className="flex flex-row mt-10">
        <div className="w-32 flex justify-end items-center ">
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
      <InputControl label={"Name"} value={name} setValue={setName} />
      <InputControl label={"Username"} value={user.username} disabled={true} />
      <InputControl label={"Email"} value={user.email} disabled={true} />
      <InputControl label={"Website"} value={website} setValue={setWebsite} />
      <InputControl label={"Bio"} value={bio} setValue={setBio} />
      <div className="flex flex-row mt-10">
        <div className="w-32 flex-none flex justify-end items-start pr-4"></div>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400 w-28"
          onClick={handleSave}
        >
          {loading ? <div>{<Spinner white={true} />}</div> : <div>Save</div>}
        </button>
        {error && <p className="text-sm text-red-400 mt-32">{error}</p>}
      </div>
    </article>
  );

  function InputControl({
    label,
    value,
    disabled = false,
    description,
    setValue = () => {},
  }) {
    return (
      <div className="flex flex-row mt-10">
        <aside className="w-32 flex-none flex justify-end items-start pr-4">
          <label>{label}</label>
        </aside>
        <div className="flex-grow" style={{ width: "100%", maxWidth: "355px" }}>
          <input
            placeholder="Name"
            type="text"
            disabled={disabled}
            className={cx("py-2 px-2 w-full border rounded", {
              "bg-gray-100": disabled,
            })}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {description && (
            <div style={{ width: "100%", maxWidth: "355px" }}>
              {description}
            </div>
          )}
        </div>
      </div>
    );
  }
}
const EditProfilePage = withSession(EditProfilePageComponent);
export default EditProfilePage;
