import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import MovieCard, { MovieCardLoading } from "../components/movieCard/MovieCard";
import Pagination from "../components/pagination/Pagination";
import { tmdb } from "../config";
import { useFilm } from "../context/FilmContext";
import useGetMovies from "../hooks/useGetMovies";

const MoviePage = () => {
  const page = useParams().page;
  const [movieState] = useFilm();

  // const movies = useGetMovies({ type: "popular", page });
  const movies = useGetMovies(
    movieState
      ? tmdb.getMovieList("popular", page)
      : tmdb.getShowList("popular", page)
  );
  const loading = !movies;

  return (
    <>
      {loading ? (
        <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
          {new Array(20).fill(0).map((item) => (
            <div className="md:w-[300px] w-[45%] flex-shrink-0" key={v4()}>
              <MovieCardLoading></MovieCardLoading>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
            {movies?.results?.length > 0 &&
              movies.results.map((item) => (
                <div
                  className="md:w-[250px] w-[45%] flex-shrink-0"
                  key={item.id}
                >
                  <MovieCard
                    name={item.title || item.name}
                    src={item.poster_path}
                    vote={item.vote_average}
                    release={item.release_date || item.first_air_date}
                    id={item.id}
                  ></MovieCard>
                </div>
              ))}
          </div>
          <Pagination page={page} searchAPI={movies}></Pagination>
        </>
      )}
      <iframe src="https://www.2embed.to/embed/tmdb/movie?id=1010283" width='100%' height='100%' allowFullScreen frameBorder="0"></iframe>
    </>
  );
};

export default MoviePage;
