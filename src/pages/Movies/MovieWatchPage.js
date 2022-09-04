import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { tmdb } from "../../config";
import useGetMovies from "../../hooks/useGetMovies";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setType } from "../../redux/TypeSlice/typeSlice";
const MovieWatchPage = () => {
  const movieId = useParams().movieId;
  const [data, setData] = useState("");
  const movies = useGetMovies(tmdb.getMovieDetails(movieId));
  const [similar, setSimilar] = useState();
  const similarResponse = useGetMovies(
    tmdb.getMovieDetails(movieId, "similar")
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setType('Movies'))
  },[])
  useEffect(() => {
    setSimilar(similarResponse);
    axios.get("https://2embed.org/embed/movie?imdb=tt6403680").then((res) => {
      setData(res);
    });
  }, [similarResponse]);
  return (
    <>
      <div className="flex md:flex-row flex-col justify-between gap-10 container ">
        <div className="flex flex-col flex-grow text-white">
          <div className="relative flex w-full md:h-[50%] h-[350px] flex-shrink-0">
            {<iframe
              id="iframe"
              title="iframe"
              src={`https://www.2embed.to/embed/tmdb/movie?id=${movieId}`}
              className="relative w-full h-full top-0 left-0"
              frameBorder="0"
              allowFullScreen
            ></iframe>}
            
          </div>
          {/* <iframe
              id="iframe"
              src={`https://www.2embed.to/embed/tmdb/movie?id=${movieId}`}
              className="absolute w-full h-full top-0 left-0"
              frameBorder="0"
              allowFullScreen
            ></iframe> */}
          <div className="flex flex-col flex-shrink-0 mt-5">
            <span className="text-white md:text-[30px] text-[35px] font-semibold ">
              {movies?.title}
            </span>
            <div className="flex md:text-md text-lg flex-row mt-5 text-tags gap-3">
              <span className="mr-3 flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:h-5 md:w-5 w-7 h-7 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span className="text-gray-400">
                  {Math.round(movies?.vote_average * 10) / 10}
                </span>
              </span>

              <span className="mr-3 flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:h-5 md:w-5 w-7 h-7 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-400">
                  {new Date(movies?.release_date).getFullYear()}
                </span>
              </span>
            </div>
            <div className="md:mt-5 mt-8 gap-2 flex-nowrap">
              <span className="md:text-xl text-2xl font-semibold">
                Overview
              </span>
              <p className="text-gray-400 pr-4 md:text-md text-xl">
                {movies?.overview}
              </p>
            </div>
          </div>
        </div>

        <div className="vertical-scroll text-white md:w-[352px] w-full flex-shrink-0 rounded-lg md:flex-col ">
          <span className="md:text-xl text-2xl font-semibold">
            Recommendations
          </span>
          {similar &&
            similar.results?.length > 0 &&
            similar.results.slice(0, 4).map((item) => (
              <Link
                to={`/movies/${item.id}`}
                className="w-full my-5 flex justify-between flex-row flex-shrink-0 gap-2 bg"
                key={item.id}
              >
                <div className="md:w-[100px] md:h-[150px] w-[170px] h-[250px] overflow-hidden rounded-lg flex-shrink-0">
                  <img
                    className="w-full h-full object-contain object-center"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt=""
                  />
                </div>

                <div className="flex flex-col flex-grow gap-3 justify-center p-3 truncate">
                  <span className="md:text-xl text-2xl flex-grow-0 max-w-full truncate">
                    {item.title}
                  </span>
                  <span className="text-gray-500 mb-6 md:text-md text-lg">
                    {item.release_date}
                  </span>
                  <span className="flex flex-row items-center md:py-0 py-1 text-tags border-tags border rounded-2xl w-fit px-4 text-sm">
                    <span className="md:text-md text-xl">
                      {Math.round(item.vote_average * 10) / 10}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="md:h-4 md:w-4 h-6 w-6 ml-2 "
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={0}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          <Link
            to={"/explore&page=1"}
            className="w-full py-2 hover:bg-gray-700 transition-all
             bg-gray-800 my-4 text-center rounded-3xl block md:text-md text-xl"
          >
            See More
          </Link>
        </div>
      </div>
    </>
  );
};

export default MovieWatchPage;
