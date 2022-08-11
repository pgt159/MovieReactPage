import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  // const [filter, setFilter] = useState("");
  const filmSearchRef = useRef();
  const navigate = useNavigate()
  

  
  // const handleChange = (e) => {
  //   setFilter(e.target.value);
  // };
  const handleClick = () => {
    navigate(`/movies/page=1&search=${filmSearchRef.current.value}`)
  }
  return (
    <form className="flex flex-row justify-center mx-5 md:max-w-[300px] w-full" onSubmit={handleClick}>
      <input
        type="text"
        name=""
        id=""
        className="px-4  outline-none rounded-l-lg w-full"
        placeholder="Search"
        // onChange={handleChange}
        ref={filmSearchRef}
      />
      <button className="h-full flex items-center justify-center p-3 bg-primary rounded-r-lg text-white"
      onClick={handleClick}>
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
