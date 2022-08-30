import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebase-config";

const LoginModal = ({setShow}) => {
  const {register, handleSubmit, formState: {isSubmitting}} = useForm({mode: 'onChange'});
  const navigate = useNavigate();
  const onSubmit = (values) =>  {
    signInWithEmailAndPassword(auth,values.email, values.password).then(res => {
      toast.success(`Login complete. Welcome ${auth.currentUser.displayName}`);
      setShow(false);
      navigate('/')
    }).catch(error => {
      if (String(error).includes('auth/user-not-found')) {
        toast.error('Account not found',{pauseOnHover: false});
      }
      if (String(error.code).includes('auth/wrong-password')) {
        toast.error('Incorrect password. Please try again', {pauseOnHover: false})
      }
    })
  }
  return (
    <div className="max-w-[400px] p-5 bg-white rounded-2xl mx-5 flex justify-center gap-5 flex-col items-center">
      <span className="text-primary text-2xl font-semibold">Log in</span>
      <form className="flex flex-col gap-5 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-full text-subText">
          <input
            type="email"
            required
            placeholder="Email"
            className="pl-5 pr-[50px] w-full py-3 rounded-2xl outline-secondary border border-primary"
            {...register('email')}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 absolute top-2/4 -translate-y-2/4 right-5 pointer-events-none"
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

        <div className="relative w-full text-subText">
          <input
            type="password"
            required
            placeholder="Password"
            className="pl-5 pr-[50px] w-full py-3 rounded-2xl outline-secondary border border-primary"
            {...register('password')}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 absolute top-2/4 -translate-y-2/4 right-5 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-secondary rounded-xl text-white font-semibold hover:text-black hover:opacity-90 transition-all"
        >
          {isSubmitting ? <div className="w-4 h-4 border-r-transparent block rounded-full border-[4px] border-white animate-spin"></div> :'Log In'}
        </button>
        <span>
          Not a member?
          <Link to={"/signup"} className="text-secondary ml-2 hover:underline"
          onClick={() => setShow(false)}>
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginModal;
