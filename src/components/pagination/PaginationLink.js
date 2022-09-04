import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { v4 } from "uuid";

const PaginationLink = ({ item, type }) => {
  const {currentType} = useSelector((state) => state.type)
  return (
    <NavLink
      key={v4()}
      to={
        type
          ? currentType === "Movies" ? `/movies/page=${item}&searchGenre=${type.id}&type=${type.name}` : `/series/page=${item}&searchGenre=${type.id}&type=${type.name}`
          : currentType === "Movies" ? `/movies&page=${item}` : `/series&page=${item}`
      }
      className={({
        isActive,
      }) => `w-auto h-8 p-2 flex justify-center items-center bg-slate-700 hover:scale-150
            transition-all mx-1 hover:rounded-lg ${
              isActive ? "scale-150 rounded-lg" : ""
            }`}
    >
      {item}
    </NavLink>
  );
};

export default PaginationLink;
