import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useGetMovies from "../hooks/useGetMovies";
import { tmdb } from "../config";
import {v4} from 'uuid'
import MovieCard, { MovieCardLoading } from "../components/movieCard/MovieCard";
import Pagination from "../components/pagination/Pagination";
const MovieSearchPage = () => {
  
  const movieName = useParams().movieName;
  const page = useParams().page;
  const searchAPI = useGetMovies({
    endpoint: tmdb.getMoviePage(movieName, page),
  });
  const loading = !searchAPI;

  return (
    <div className="">
      {loading ? (
        <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
          {new Array(20).fill(0).map(item => (
            <div className="md:w-[300px] w-[45%] flex-shrink-0" key={v4()}>
                  <MovieCardLoading></MovieCardLoading>
                </div>

          ))}
        </div>
      ) : searchAPI?.results?.length > 0 ? (
        <>
          <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
            {searchAPI?.results?.length > 0 &&
              searchAPI?.results?.map((item) => {
                if (item?.title && item?.poster_path && item?.vote_average && item?.release_date && item?.id) return (
                  <div className="md:w-[300px] w-[45%] flex-shrink-0" key={item.id}>
                  <MovieCard
                    name={item?.title}
                    src={item?.poster_path}
                    vote={item?.vote_average}
                    release={item?.release_date}
                    id={item?.id}
                    item={item}
                  ></MovieCard>
                </div>
                )
            })}
          </div>
          
          <Pagination searchAPI={searchAPI} page={page}></Pagination>
        </>
      ) : (
        <span className="text-white text-2xl text-center mt-10 block">
          There is no result for <span className='text-primary italic'>{movieName}</span>
        </span>
      )}
    </div>
  );
};


export default MovieSearchPage;
