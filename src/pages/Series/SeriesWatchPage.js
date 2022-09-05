import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieListItem from "../../components/movieCard/MovieListItem";
import { tmdbSeries } from "../../config";
import useGetMovies from "../../hooks/useGetMovies";
import { setType } from "../../redux/TypeSlice/typeSlice";
import SEChosing from "./SEChosing";
const SeriesWatchPage = () => {
  const dispatch = useDispatch()
  const {season, ep, movieId} = useParams()
  const movies = useGetMovies(tmdbSeries.getSeriesDetails(movieId));
  const se = useGetMovies(
    `https://api.themoviedb.org/3/tv/${movieId}/season/${season}?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US`
  );
  const [similar, setSimilar] = useState();
  const similarResponse = useGetMovies(
    tmdbSeries.getSeriesDetails(movieId, "similar")
  );
  
  useEffect(() => {
    setSimilar(similarResponse);
    dispatch(setType('Series'))
  }, [similarResponse]);
  return (
    <>
      <div className="flex flex-col justify-between gap-10 container ">
        <div className="flex flex-col flex-grow text-white">
          <div className="relative flex w-full md:h-[500px] h-[350px] flex-shrink-0">
            {<iframe
              id="iframe"
              title="iframe"
              src={`https://www.2embed.to/embed/tmdb/tv?id=${movieId}&s=${season}&e=${ep}`}
              className="relative w-full h-full top-0 left-0"
              frameBorder="0"
              allowFullScreen
            ></iframe>}
            
          </div>
          <div className="flex flex-col flex-shrink-0 mt-5">
            <span className="text-white md:text-[30px] text-[35px] font-semibold ">
              {movies?.name}
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
                  {new Date(movies?.first_air_date).getFullYear()}
                </span>
              </span>
            </div>
            <div className="md:mt-5 mt-8 gap-2 flex-nowrap">
              <span className="md:text-xl text-2xl font-semibold">
                Overview season {season}
              </span>
              <p className="text-gray-400 pr-4 md:text-md text-xl">
                {se?.overview}
              </p>
            </div>
          </div>
        </div>

        <div className="vertical-scroll text-white w-full flex-shrink-0 rounded-lg md:flex-col ">
          <SEChosing seasonNumber={movies?.number_of_seasons} id={movieId} se={se} season={season} ep={ep}></SEChosing>
        </div>
        <div className="flex flex-col gap-y-5 text-white">
        <span className="text-2xl font-semibold mx-auto">Similar Movies</span>
        <div className="container movie-list ">
          <Swiper grabCursor={"true"} spaceBetween={50} slidesPerView={'auto'}>
            {similar &&
              similar?.results?.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieListItem
                    name={item.title || item.name}
                    src={item.poster_path}
                    vote={item.vote_average}
                    release={item.release_date || item.first_air_date}
                    id={item.id}
                    item={item}
                    type={item.seasons}
                  ></MovieListItem>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      </div>
    </>
  );
};

export default SeriesWatchPage;
