import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/layout/SearchBar";
import MovieCard from "../components/movieCard/MovieCard";
import Pagination from "../components/pagination/Pagination";
import useGetMovies from "../hooks/useGetMovies";
const MoviePage = () => {
  const page = useParams().page
  const movies = useGetMovies({type: 'popular', page})
  return (
    <>
      <div className="w-full h-auto text-white flex flex-wrap flex-row gap-y-7 gap-x-7 justify-center">
        {movies?.results?.length > 0 &&
          movies.results.map((item) => (
            <div className="w-[300px]" key={item.id}>
              <MovieCard
                name={item.title || item.name}
                src={item.poster_path}
                vote={item.vote_average}
                release={item.release_date || item.first_air_date}
                id={item.id}
                item={item}
              ></MovieCard>
            </div>
          ))}
      </div>
      <Pagination page={page} searchAPI={movies}></Pagination>
    </>
  );
};

export default MoviePage;
