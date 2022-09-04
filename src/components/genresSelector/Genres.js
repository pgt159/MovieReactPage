import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useClickToggle from "../../hooks/useClickToggle";

const Genres = ({ isHovered, setIsHovered }) => {
  const genres = useSelector((state) => state.genre.genreList);
  const { currentType } = useSelector((state) => state.type);
  const navigate = useNavigate();
  const menuRef = useRef();
  const { isMobile, isShow, setIsShow } = useClickToggle({ menuRef });

  const loading = !genres;
  const handleOpenGenres = (e) => {
    if (!isMobile) {
      setIsShow(true);
    }
  };
  const handleCloseGenres = (e) => {
    if (!isMobile) {
      setIsShow(false);
    }
  };
  return (
    <div
      className="hover:text-primary transition-all relative"
      onMouseEnter={handleOpenGenres}
      onMouseLeave={handleCloseGenres}
    >
      <span className="cursor-pointer w-full h-full" ref={menuRef}>
        Genres
      </span>
      <div
        className={`genres-list p-5 flex flex-wrap gap-4 justify-start items-center transition-all ${
          isShow ? "translate-x-0 md:flex" : "translate-x-full md:hidden"
        } md:absolute md:left-0 md:-bottom-[20px] md:top-auto md:translate-y-full
         z-30 md:h-[300px] bg-slate-900 md:w-[600px] fixed left-[100px] right-0 bottom-0 top-0 bg-opacity-70`}
      >
        {loading && (
          <div
            className="w-10 h-10 rounded-full border-8 border-r-8 
          border-secondary border-r-transparent animate-spin genre-list"
          ></div>
        )}
        {genres?.length > 0 &&
          genres.map((item) => (
            <div
              key={item.id}
              className="w-auto mx-5 cursor-pointer hover:text-primary text-white transition-all"
              onClick={() => {
                setIsHovered(false);
                navigate(
                  `${
                    currentType === "Movies"
                      ? `/movies/page=1&searchGenre=${item.id}&type=${item.name}`
                      : `/series/page=1&searchGenre=${item.id}&type=${item.name}`
                  }`
                );
              }}
            >
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Genres;
