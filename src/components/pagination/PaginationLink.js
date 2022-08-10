import React from "react";
import { NavLink } from "react-router-dom";
import { v4 } from "uuid";

const PaginationLink = ({item, movieName, type}) => {
  console.log(type)
  return (
    <NavLink
      key={v4()}
      to={movieName ? `/movies/page=${item}&search=${movieName}?` : type ? `/movies/page=${item}&searchGenre=${type.id}&type=${type.name}` : `/movies&page=${item}`}
      className={({
        isActive
      }) => `w-auto h-8 p-2 flex justify-center items-center bg-slate-700 hover:scale-150
            transition-all hover:rounded-lg ${
              isActive ? "scale-150 rounded-lg" : ""
            }`}
    >
      {item}
    </NavLink>
  );
};

export default PaginationLink;
