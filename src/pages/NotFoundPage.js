import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container max-w-[1200px] mx-auto p-10 border border-white
        flex justify-center items-center flex-col text-white"
    >
      <span className="text-[140px] leading-[140px] text-white">
        <span>4</span>
        <span className="text-primary">0</span>
        <span>4</span>
      </span>
      <span className="text-[60px]">SORRY, THERE'S</span>
      <span className="text-[60px] text-primary">NOTHING HERE</span>
      <button
      onClick={() => navigate('/')}
        className="mt-5 px-5 py-2 bg-primary text-white rounded-md hover:rounded-none hover:scale-150
            transition-all"
      >
        GO HOME
      </button>
    </div>
  );
};

export default NotFoundPage;
