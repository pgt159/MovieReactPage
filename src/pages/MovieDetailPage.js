import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/movieCard/MovieCard";
import { tmdb } from "../config";
import useGetMovies from "../hooks/useGetMovies";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [credit, setCredit] = useState([]);
  const [video, setVideo] = useState();
  const [similar, setSimilar] = useState();

  const response = useGetMovies({
    endpoint: tmdb.getMovieDetails(movieId, null),
  });
  const creditResponse = useGetMovies({
    endpoint: tmdb.getMovieDetails(movieId, "credits"),
  });
  const videoResponse = useGetMovies({
    endpoint: tmdb.getMovieDetails(movieId, "videos"),
  });
  const similarResponse = useGetMovies({
    endpoint: tmdb.getMovieDetails(movieId, "similar"),
  });
  useEffect(() => {
    setMovie(response);
    setCredit(creditResponse?.cast?.slice(0, 5));
    setVideo(videoResponse);
    setSimilar(similarResponse);
  }, [response, creditResponse, videoResponse, similarResponse]);

  return (
    <div className="flex flex-col gap-y-10 text-white pb-10">
      <div className="h-[500px] w-full top-0 left-[50%] -translate-x-2/4 absolute -z-10">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          className="opacity-20 w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="w-[60%] h-[600px] relative mx-auto bg-white overflow-hidden rounded-xl">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          className=" w-full h-full object-cover"
          alt=""
        />
      </div>
      <span className="text-[30px] mx-auto font-semibold">{movie?.title}</span>
      <div className="flex flex-row justify-center flex-nowrap gap-x-10">
        {movie?.genres?.length > 0 &&
          movie?.genres?.map((item) => (
            <div
              key={movie?.genres?.indexOf(item)}
              className="border border-tags rounded-xl text-tags p-2"
            >
              {item.name}
            </div>
          ))}
      </div>
      <span className="w-[80%] mx-auto text-center leading-relaxed">
        {movie?.overview}
      </span>
      <span className="text-[25px] mx-auto font-semibold">Cast</span>
      <div className="flex flex-row gap-x-5 max-w-[1280px] h-auto mx-auto justify-center">
        {credit?.length > 0 &&
          credit?.map((item) => (
            <div
              className="w-[15%]  flex flex-col gap-y-5 text-center"
              key={item.id}
            >
              {item.profile_path && (
                <img
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                      : null
                  }
                  className="w-full h-[250px] object-cover rounded-lg"
                  alt=""
                />
              )}
              <div className="flex flex-col ">
                <span className="text-[20px]">{item.name}</span>
                as
                <span className="text-[20px]">{item.character}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="relative w-full">
        {/*  */}
        {video?.results?.length > 0 ? (
          <iframe
            className="relative left-2/4 -translate-x-2/4"
            width="727"
            height="409"
            src={`https://www.youtube.com/embed/${
              video?.results && video?.results[0].key
            }`}
            title="Dilwale Dulhania Le Jayenge | 25 Years Weeks Trailer | Shah Rukh Khan, Kajol | Aditya Chopra | DDLJ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : <img
                  src={"https://cxl.com/wp-content/uploads/2016/04/errormessages.jpg"}
                  className="max-w-[600px] object-cover rounded-lg mx-auto"
                  alt=""
                />}
      </div>
      <div className="flex flex-col gap-y-10">
        <span className="text-2xl font-semibold mx-auto">Similar Movies</span>
        <div className="container movie-list">
          <Swiper grabCursor={"true"} spaceBetween={50} slidesPerView={"auto"}>
            {similar &&
              similar?.results?.slice(0, 6)?.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard
                    name={item.title || item.name}
                    src={item.poster_path}
                    vote={item.vote_average}
                    release={item.release_date || item.first_air_date}
                    id={item.id}
                    item={item}
                  ></MovieCard>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
