import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const filmSearchRef = useRef();
  const { currentType } = useSelector((state) => state.type);
  const navigate = useNavigate();
  const handleClick = () => {
    if (filmSearchRef.current.value === "") return;
    navigate(
      `${
        currentType === "Movies"
          ? `/movies/search=${filmSearchRef.current.value}`
          : `/series/search=${filmSearchRef.current.value}`
      }`
    );
  };
  return (
    <form
      className="flex flex-row justify-center mx-5 md:max-w-[300px] w-full"
      onSubmit={handleClick}
    >
      <input
        type="text"
        name=""
        id=""
        className="px-4 border border-primary outline-none rounded-l-lg w-full"
        placeholder="Search"
        // onChange={handleChange}
        ref={filmSearchRef}
      />
      <button
        className="h-full flex items-center justify-center hover:opacity-80 transition-all p-3 bg-primary rounded-r-lg text-white"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
