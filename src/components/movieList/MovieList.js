import React, { useEffect, useState } from "react";
import { EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useGetMovies from "../../hooks/useGetMovies";
import { SlideNextButton, SlidePrevButton } from "../button/SlideButton";
import MovieCard, { MovieCardLoading } from "../movieCard/MovieCard";

const MovieList = ({ type }) => {
  const movies = useGetMovies({type});
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
      <Swiper grabCursor={"true"} spaceBetween={50} slidesPerView={"auto"}>
      <SlideNextButton></SlideNextButton>
      <SlidePrevButton></SlidePrevButton>
        {movies?.results?.length > 0 &&
          movies.results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard
                name={item.title || item.name}
                src={item.poster_path}
                vote={item.vote_average}
                release={item.release_date || item.first_air_date}
                id={item.id}
              ></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
