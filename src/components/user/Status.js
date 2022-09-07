import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../../redux/TypeSlice/typeSlice";

const Status = ({ onClick, className }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const { currentType } = useSelector((state) => state.type);
  const dispatch = useDispatch();
  return (
    <div className={className}>
      <div className="flex gap-3 items-center">
        <span
          className={`${
            currentType === "Series" ? "text-white" : "text-subText"
          } cursor-pointer hover:opacity-80 transition-all`}
          onClick={(e) => {
            dispatch(setType(e.target.textContent));
            navigate('/')
          }}
        >
          Series
        </span>
        <span
          className={`${
            currentType === "Movies" ? "text-white" : "text-subText"
          } cursor-pointer hover:opacity-80 transition-all`}
          onClick={(e) => {
            dispatch(setType(e.target.textContent));
            navigate('/')
          }}
        >
          Movies
        </span>
      </div>
      {userInfo ? (
        <span className="text-white">
          Welcome
          <button
            onClick={() => navigate("/account/general")}
            className="text-secondary hover:underline ml-2"
          >
            {userInfo.displayName}
          </button>
        </span>
      ) : (
        <div
          className="flex gap-3 flex-row items-center text-white 
         justify-center hover:text-secondary cursor-pointer hover:underline hover:scale-125 transition-all"
          onClick={onClick}
        >
          <span className=" ">Sign In</span>
          <button className="w-[30px] h-[30px] rounded-full ">
            <img
              className="pointer-events-none"
              src="/default_avatar.png"
              alt=""
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Status;
