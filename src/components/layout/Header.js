import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import Genres from "../genresSelector/Genres";
import LoginModal from "../modal/LoginModal.js/LoginModal";
import Modal from "../modal/Modal";
import SearchModal from "../modal/searchModal/SearchModal";
import Status from "../user/Status";
const list = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
  {
    id: 2,
    title: "Explore",
    to: "/explore&page=1",
  },
];
const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [child, setChild] = useState("");
  const handleClick = (modal) => {
    setModalShow(true);
    setChild(modal);
  };
  return (
    <Fragment>
      <div className="z-[200] flex md:flex-row flex-col justify-between mb-5 p-5
       bg-slate-900 items-center relative rounded-lg bg-opacity-70">
        <div
          className={`header text-white flex items-center justify-center md:gap-7 gap-4 z-[60]`}
        >
          {list.map((item) => (
            <NavLink
              to={item.to}
              key={item.id}
              className={({ isActive }) =>
                ` hover:text-primary transition-all flex items-center${
                  isActive ? "text-primary" : ""
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
          <Genres isHovered={isHovered} setIsHovered={setIsHovered}></Genres>
          <button
            onClick={() => handleClick(<SearchModal></SearchModal>)}
            className="hover:text-primary transition-all"
          >
            Search
          </button>
        </div>
        <Status
          onClick={() =>
            handleClick(<LoginModal setShow={setModalShow}></LoginModal>)
          }
          className={
            "relative right-0 top-0 flex flex-row md:gap-4 gap-3 mt-10 md:mt-0"
          }
        ></Status>
        <Modal show={modalShow} setShow={setModalShow}>
          {child}
        </Modal>
      </div>
    </Fragment>
  );
};

export default Header;
