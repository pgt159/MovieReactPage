import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  tmdbSeries } from "../../config";
import useGetMovies from "../../hooks/useGetMovies";
import { SlideNextButton, SlidePrevButton } from "../button/SlideButton";
import { MovieCardLoading } from "../movieCard/MovieCard";
import MovieListItem from "../movieCard/MovieListItem";

const SeriesList = ( {type} ) => {
  
  const movies = useGetMovies(tmdbSeries.getSeriesList(type));
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
      <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"} fadeEffect={false}>
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

export default SeriesList;
