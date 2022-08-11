import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdb } from "../../config";
import { useFilm } from "../../context/FilmContext";
import useGetMovies from "../../hooks/useGetMovies";
import { SlideNextButton, SlidePrevButton } from "../button/SlideButton";
import { MovieCardLoading } from "../movieCard/MovieCard";
import MovieListItem from "../movieCard/MovieListItem";

const MovieList = ({ type }) => {
  const [movieState, setMovieState] = useFilm();
  // function result () {
  //   if (movieState) {

  //   } 
  // }
  const movies = useGetMovies(movieState ? tmdb.getMovieList(type) : tmdb.getShowList(type));
  // const [movies, setMovies] = useState([])
  // useEffect(() => {
  //   axios.get(tmdb.getMovieList(type))
  //     .then((res) => {
  //       setMovies(res.data)
  //     })
  // }, [])
  // 
  const isLoading = !movies || movies.length < 1;
  return (
    <div className="w-full movie-list relative">
    {
      isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={50} slidesPerView={"auto"} >
            <SwiperSlide >
              <MovieCardLoading></MovieCardLoading>
            </SwiperSlide>
            <SwiperSlide >
              <MovieCardLoading></MovieCardLoading>
            </SwiperSlide>
            <SwiperSlide >
              <MovieCardLoading></MovieCardLoading>
            </SwiperSlide>
            <SwiperSlide >
              <MovieCardLoading></MovieCardLoading>
            </SwiperSlide>
            <SwiperSlide >
              <MovieCardLoading></MovieCardLoading>
            </SwiperSlide>
            <SwiperSlide >
              <MovieCardLoading></MovieCardLoading>
            </SwiperSlide>
      </Swiper>
      )
    }
      <Swiper grabCursor={"true"} spaceBetween={50} slidesPerView={"auto"} fadeEffect={false}>
      <SlideNextButton></SlideNextButton>
      <SlidePrevButton></SlidePrevButton>
        {movies?.results?.length > 0 &&
          movies.results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieListItem
                name={item.title || item.name}
                src={item.poster_path}
                vote={item.vote_average}
                release={item.release_date || item.first_air_date}
                id={item.id}
              ></MovieListItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
