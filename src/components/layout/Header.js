import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import Genres from "../genresSelector/Genres";
import SearchBar from "./SearchBar";
const list = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
  {
    id: 2,
    title: "Movies",
    to: "/movies&page=1",
  },
];
const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Fragment>
      <div className="flex md:flex-row gap-10 flex-col justify-between mb-5 p-5 bg-slate-900 items-center relative rounded-lg bg-opacity-70">
        <div
          className={`header text-white flex items-center justify-center gap-x-10 z-[60]`}
        >
          {list.map((item) => (
            <NavLink
              to={item.to}
              key={item.id}
              className={({ isActive }) => ` hover:text-primary transition-all ${(isActive ? "text-primary" : "")}`}
            >
              {item.title}
            </NavLink>
            
          ))}
          <Genres isHovered={isHovered} setIsHovered={setIsHovered}></Genres>
        </div>
        <SearchBar></SearchBar>
      </div>
    </Fragment>
  );
};

export default Header;
