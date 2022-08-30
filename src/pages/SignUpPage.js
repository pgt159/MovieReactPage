import {
  addDoc,
  collection,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { auth, db } from "../firebase-config";
import LoginModal from "../components/modal/LoginModal.js/LoginModal";
import Modal from "../components/modal/Modal";
const SignUpPage = () => {
  const schema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .max(10, "Max 10 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .max(10, "Max 10 characters"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Your password must be 8 characters or more"),
  });
  const [modalShow, setModalShow] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const [togglePass, setTogglePass] = useState(false);

  const handleTogglePass = () => {
    setTogglePass(!togglePass);
  };
  const navigate = useNavigate();
  const submitForm = async (values) => {
    if (!isValid) return;
    console.log(isSubmitted);
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: `${values.firstName} ${values.lastName}`,
    });
    await addDoc(collection(db, "users"), {
      uid: auth.currentUser.uid,
      history: JSON.stringify([]),
      bookmark: JSON.stringify([])
    });
    toast.success("Register successfully");
    navigate("/");
    return new Promise((res) => {
      setTimeout(() => {
        
      }, 100);
    });
  };

  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, { pauseOnHover: false });
    }
  }, [errors]);

  return (
    <div className="flex flex-col container px-10 items-center lg:items-start">
      <div className="flex flex-col z-40">
        <span className="text-subText text-[24px] mb-2 font-semibold">
          START FOR FREE
        </span>
        <span className="text-white font-semibold text-[45px] mb-4">
          Create new account <span className="text-secondary">.</span>
        </span>
        <span className="text-[20px] text-subText mb-4">
          Already a member?{" "}
          <button
            onClick={() => setModalShow(true)}
            className="text-secondary ml-2 hover:underline transition-all"
          >
            Log in
          </button>
        </span>
      </div>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="relative w-50% flex flex-col gap-10 md:w-[500px] z-40"
      >
        <div className="flex flex-row justify-between gap-5">
          <div className="relative text-white md:w-[45%]">
            <input
              type="text"
              placeholder="First name"
              className="pl-5 pr-[50px] w-full py-3 rounded-2xl border-none outline-secondary bg-slate-700"
              {...register("firstName")}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 absolute top-2/4 -translate-y-2/4 right-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
          </div>

          <div className="relative text-white md:w-[45%]">
            <input
              type="text"
              placeholder="Last name"
              className="pl-5 pr-[50px] w-full py-3 rounded-2xl border-none outline-secondary bg-slate-700"
              {...register("lastName")}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 absolute top-2/4 -translate-y-2/4 right-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
          </div>
        </div>
        <div className="relative w-full text-white">
          <input
            type="email"
            placeholder="Email"
            className="pl-5 pr-[50px] w-full py-3 rounded-2xl border-none outline-secondary bg-slate-700"
            {...register("email")}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 absolute top-2/4 -translate-y-2/4 right-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div className="relative w-full text-white">
          <input
            type={togglePass ? "text" : "password"}
            placeholder="Password"
            className="pl-5 pr-[50px] w-full py-3 rounded-2xl border-none outline-secondary bg-slate-700"
            {...register("password")}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 absolute top-2/4 -translate-y-2/4 right-5 cursor-pointer"
            onClick={() => handleTogglePass()}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="px-10 py-4 bg-secondary mt-5 rounded-3xl hover:opacity-80 transition-all text-[20px] font-semibold text-white"
          >
            {isSubmitting ? (
              <div className="w-10 h-10 border-[5px] rounded-full block border-white border-r-transparent border-l-transparent animate-spin"></div>
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>
      <div
        className="lg:block hidden fixed right-0 top-0 left-[50%] bottom-0 
      pointer-events-none h-full overflow-hidden"
      >
        <div className="sign-up-background absolute inset-0 z-50"></div>
        <img
          className="w-full z-10 opacity-40"
          src="/chris-johnson-_1O4ouTZQtg-unsplash.jpg"
          alt=""
        />
      </div>
      <Modal show={modalShow} setShow={setModalShow}>
          {<LoginModal setShow={setModalShow}></LoginModal>}
        </Modal>
    </div>
  );
};

export default SignUpPage;
