import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tmdb } from "../../config";
import useGetMovies from "../../hooks/useGetMovies";

const Genres = ({ isHovered, setIsHovered }) => {

  const movies = useGetMovies(tmdb.getMovieGenre())?.genres;
  const navigate = useNavigate();
  const loading = !movies;
  const handleOpenGenres = (e) => {
    setIsHovered(true);
  };
  const handleCloseGenres = (e) => {
    setIsHovered(false);
  };
  const handleClick = (e) => {
    console.log(e.target);
  };
  return (
    <div
      className="hover:text-primary transition-all relative"
      onMouseEnter={handleOpenGenres}
      onMouseLeave={handleCloseGenres}
    >
      <span className="cursor-pointer w-full h-full">Genres</span>
      <div
        className={`genres-list p-5 flex flex-wrap gap-4 justify-start items-center transition-all ${
          isHovered ? "translate-x-0 md:flex" : "translate-x-full md:hidden"
        } md:absolute md:left-0 md:-bottom-[20px] md:top-auto md:translate-y-full
         z-30 md:h-[300px] bg-slate-900 md:w-[600px] fixed left-[100px] right-0 bottom-0 top-0 bg-opacity-70`}
      >
        {loading && (
          <div
            className="w-10 h-10 rounded-full border-8 border-r-8 
          border-secondary border-r-transparent animate-spin genre-list"
          ></div>
        )}
        {movies?.length > 0 &&
          movies.map((item) => (
            <div
              key={item.id}
              className="w-auto mx-5 cursor-pointer hover:text-primary text-white transition-all"
              onClick={() => {
                setIsHovered(false)
                navigate(
                  `/movies/page=1&searchGenre=${item.id}&type=${item.name}`
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
