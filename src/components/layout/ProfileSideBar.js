import React from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import useClickToggle from "../../hooks/useClickToggle";

const ProfileSideBar = () => {
  const menuRef = useRef();
  const { isShow } = useClickToggle({ menuRef });

  return (
    <div className="">
      <div
        className="p-4 bg-primary text-white bg-opacity-40 w-fit md:hidden fixed right-5 bottom-5"
        ref={menuRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <div
        className={` transition-all flex-col gap-3 md:w-[200px] z-[300]
       text-white flex md:translate-x-[0] items-start md:p-0 px-5 md:bg-transparent
        bg-slate-700 justify-center md:relative fixed top-0 bottom-0 left-0 w-2/3 ${
          isShow ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <span className="text-xl font-semibold">ACCOUNT</span>
        <div className="flex flex-col gap-5 pl-3 mb-10 ">
          <NavLink
            className={({ isActive }) =>
              `hover:text-primary transition-all flex flex-row gap-3 ${
                isActive ? "text-primary" : ""
              }`
            }
            to={"/account/general"}
          >
            {/* hover:text-primary transition-all flex flex-row gap-3 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            General
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `hover:text-primary transition-all flex flex-row gap-3 ${
                isActive ? "text-primary" : ""
              }`
            }
            to={"/account/password"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Password
          </NavLink>
        </div>

        <span className="text-xl font-semibold">PERSONAL</span>
        <div className="flex flex-col gap-5 pl-3">
          <NavLink
            className={({ isActive }) =>
              `hover:text-primary transition-all flex flex-row gap-3 ${
                isActive ? "text-primary" : ""
              }`
            }
            to={"/account/bookmark"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Bookmark
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:text-primary transition-all flex flex-row gap-3 ${
                isActive ? "text-primary" : ""
              }`
            }
            to={"/account/history"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            History
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
