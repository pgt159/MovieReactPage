import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { auth } from "../firebase-config";

const ChangePassword = () => {
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const userInfo = useSelector((state) => state.auth.userInfo)

  return (
    <div className="w-full mb-10 text-white">
      <h1 className="text-[40px] font-semibold block mb-10 w-full text-center">
        PASSWORD
      </h1>
      <h3 className="text-[25px] mb-2 ">User Password</h3>
      <p className="mb-5">
        Here you can change your current password. <br />
        If you are signing in with Google or Facebook, you can't change your
        password.
      </p>
      <form onSubmit={handleSubmit}>
        {passwordEdit ? (
          <div className="flex flex-col gap-5">
            <input
              id="oldPass"
              className="w-[300px] rounded-lg bg-slate-600 px-4 py-2"
              type="password"
              placeholder={"Your OLD password"}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
            <input
              id="newPass"
              className="w-[300px] rounded-lg bg-slate-600 px-4 py-2"
              type="password"
              placeholder={"Your NEW password"}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <div className="flex flex-row gap-3">
              <button
                className="px-2 py-2 bg-gray-600 rounded-lg hover:opacity-80 transition-all"
                onClick={() => setPasswordEdit(false)}
              >
                Cancel
              </button>
              <button
                className="px-2 py-2 bg-green-600 rounded-lg hover:opacity-80 transition-all"
                onClick={async () => {
                  if (
                    !newPassword.trim().length ||
                    !oldPassword.trim().length
                  ) {
                    toast.error("Enter your password");
                    return;
                  }
                  setLoading(true);
                  const credential = EmailAuthProvider.credential(
                    userInfo.email,
                    oldPassword
                  );
                  const result = await reauthenticateWithCredential(
                    auth.currentUser,
                    credential
                  );
                  updatePassword(auth.currentUser, newPassword)
                    .then((res) => {
                      toast.success("Update successfully.");
                    })
                    .catch((err) => {
                      console.log(err.code);
                    });
                  setLoading(false);
                  setPasswordEdit(false);
                }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-[3px] border-white rounded-full border-r-transparent animate-spin"></div>
                ) : (
                  "Finish"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-between w-[300px] text-subText">
            <button
              onClick={() => {
                setPasswordEdit(true);
              }}
            >
              {"Click to change your password"}
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => {
                setPasswordEdit(true);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
