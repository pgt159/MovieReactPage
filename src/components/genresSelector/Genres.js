import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetMovies from "../../hooks/useGetMovies";

const Genres = () => {
  const [isHovered, setIsHovered] = useState(false);
  // https://api.themoviedb.org/3/discover/movie?api_key=68ff44b16c8cfc514f5219295b422d75&with_genres=28
  //    https://api.themoviedb.org/3/genre/movie/list?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US
  const movies = useGetMovies({
    endpoint:
      "https://api.themoviedb.org/3/genre/movie/list?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US",
  })?.genres;
  const navigate = useNavigate()
  console.log(movies)
  const loading = !movies;
  const handleOpenGenres = (e) => {
    setIsHovered(true);
  };
  const handleCloseGenres = (e) => {
    setIsHovered(false);
  };
  return (
    <div
      className="hover:text-primary transition-all relative"
      onMouseEnter={handleOpenGenres}
      onMouseLeave={handleCloseGenres}
    >
      <span className="cursor-pointer w-full h-full">Genres</span>
      <div
        className={`genres-list p-5 flex flex-wrap gap-4 justify-start items-center ${
          isHovered ? "flex" : "hidden"
        } absolute bg-white left-0 -bottom-[20px] translate-y-full
         z-30 h-[300px] bg-slate-900 w-[600px]`}
      >
        {loading && (
          <div className="w-10 h-10 rounded-full border-8 border-r-8 
          border-secondary border-r-transparent animate-spin genre-list"></div>
        )}
        {movies?.length > 0 && movies.map(item => (
            <div key={item.id} 
            className='w-auto mx-5 cursor-pointer hover:text-primary text-white transition-all'
            onClick={() => navigate(`/movies/page=1&searchGenre=${item.id}&type=${item.name}`)}
            >
                {item.name}
            </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
