import {
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "../components/modal/Modal";
import ConfirmModal from "../components/modal/ConfirmModal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";

const UserProfile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo)
  const [displayNameEdit, setDisplayNameEdit] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [child, setChild] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const userRef = collection(db, "users");

  const deleteSignedUser = async (password) => {
    const credential = EmailAuthProvider.credential(userInfo.email, password)
      console.log(credential)
    const result = await reauthenticateWithCredential(auth.currentUser,credential);

    await deleteUser(result.user);
    toast.success('Your account has been deleted')
  };

  return (
    <div className="w-full pb-10 border-l-[1px] pl-5 text-white">
      <h1 className="text-[40px] font-semibold block mb-10 w-full text-center">
        GENERAL
      </h1>
      <h3 className="text-[25px] mb-2 ">User Information</h3>
      <p className="mb-5">
        Here you can edit public information about yourself. <br />
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="flex flex-col gap-2 text-lg mb-5">
          <span>Email</span>
          <span className="text-subText">{userInfo.email}</span>
        </label>

        <label
          htmlFor="displayName"
          className="flex flex-col gap-2 text-lg mb-5"
        >
          <span>Display Name</span>
          {displayNameEdit ? (
            <div className="flex md:flex-row gap-5 flex-col">
              <input
                id="email"
                className="w-[300px] rounded-lg bg-slate-600 px-4 py-2"
                type="text"
                placeholder={userInfo.displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
              />
              <div className="flex flex-row gap-3">
                <button
                  className="px-2 py-2 bg-gray-600 rounded-lg hover:opacity-80 transition-all"
                  onClick={() => setDisplayNameEdit(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-2 py-2 bg-green-600 rounded-lg hover:opacity-80 transition-all"
                  onClick={async () => {
                    if (!displayName.trim().length) {
                      toast.error("Enter your display name");
                      return;
                    }
                    setLoading(true);
                    await updateProfile(auth.currentUser, {
                      displayName: displayName,
                    });
                    toast.success(
                      "Update successfully. Please reload the page"
                    );
                    setLoading(false);
                    setDisplayNameEdit(false);
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
              <span>{userInfo.displayName}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => {
                  setDisplayNameEdit(true);
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
        </label>
      </form>
      <div className="flex flex-row gap-10 mt-8">
        <button
          className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all hover:text-red-500"
          onClick={() => {
            setShow(true);
            setChild(
              <ConfirmModal
                setShow={setShow}
                action={"Sign Out"}
                func={() => {
                  auth.signOut();
                  navigate("/");
                }}
              ></ConfirmModal>
            );
          }}
        >
          Sign Out
        </button>
        <button
          className="bg-red-800 px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
          onClick={() => {
            setShow(true);
            setChild(
              <ConfirmModal
                setShow={setShow}
                action={"Delete this account"}
                reauth
                func={async (pass) => {
                  if (auth.currentUser) 
                  deleteSignedUser(pass).then((res) => {
                    
                  }).catch(err => {
                    if (!pass.trim().length) {
                      toast.error('Please enter your password')
                    }
                    if (err.code === 'auth/wrong-password') {
                      toast.error('Incorrect password')
                    }
                  });
                  getDocs(userRef).then((snapshot) => {
                    snapshot.docs.forEach((item) => {
                      if (item.data().uid === auth.currentUser.uid) {
                        const docRef = doc(db, "users", item.id);
                        deleteDoc(docRef).then((res) => console.log("done!"));
                      }
                    });
                  });
                  navigate("/");
                }}
              ></ConfirmModal>
            );
          }}
        >
          Delete account
        </button>
      </div>
      <Modal show={show} setShow={setShow}>
        {child}
      </Modal>
    </div>
  );
};

export default UserProfile;
