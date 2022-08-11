import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useGetMovies from "../hooks/useGetMovies";
import { v4 } from "uuid";
import MovieCard, { MovieCardLoading } from "../components/movieCard/MovieCard";
import Pagination from "../components/pagination/Pagination";

const GenresSearchPage = () => {
  // https://api.themoviedb.org/3/discover/movie?api_key=68ff44b16c8cfc514f5219295b422d75&with_genres=28
  const genre = useParams().genre;
  const page = useParams().page;
  const type = useParams().type;
  const searchAPI = useGetMovies({
    endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=68ff44b16c8cfc514f5219295b422d75&with_genres=${genre}&page=${page}`,
  });
  console.log(searchAPI)
  const loading = !searchAPI;

  return (
    <div className="">
      <span className="my-10 block text-2xl text-white text-center">
        Result for <span className="text-primary">{type}</span> film
      </span>
      {loading ? (
        <div className="w-full h-auto text-white flex flex-wrap flex-row gap-y-7 gap-x-7 justify-center">
          {new Array(20).fill(0).map((item) => (
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
                if (
                  item?.title &&
                  item?.poster_path &&
                  item?.vote_average &&
                  item?.release_date &&
                  item?.id
                )
                  return (
                    <div className="md:w-[300px] w-[48%] flex-shrink-0" key={item.id}>
                      <MovieCard
                        name={item?.title}
                        src={item?.poster_path}
                        vote={item?.vote_average}
                        release={item?.release_date}
                        id={item?.id}
                        item={item}
                      ></MovieCard>
                    </div>
                  );
              })}
          </div>

          <Pagination
            type={
              {id: genre,
              name: type,}
            }
            searchAPI={searchAPI}
            page={page}
          ></Pagination>
        </>
      ) : (
        <span className="text-white text-2xl text-center mt-10 block">
          There is no result for {genre}
        </span>
      )}
    </div>
  );
};

export default GenresSearchPage;
