import React from "react";
import SearchBar from "../../layout/SearchBar";

const SearchModal = () => {
  return (
    <div className="max-w-[400px] p-5 bg-white rounded-2xl mx-5 flex justify-center gap-5 flex-col items-center">
      <span className="text-primary text-2xl">Looking for something?</span>
      <SearchBar></SearchBar>
    </div>
  );
};

export default SearchModal;
