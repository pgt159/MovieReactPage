import React, { Fragment } from "react";
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
  return (
    <Fragment>
      <div className="flex flex-row justify-between px-10 py-5 bg-slate-900 items-center relative">
        <div
          className={`header text-white flex items-center justify-center gap-x-10`}
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
          <Genres></Genres>
        </div>
        <SearchBar></SearchBar>
      </div>
    </Fragment>
  );
};

export default Header;
