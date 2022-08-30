import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { SlideNextButton, SlidePrevButton } from "../button/SlideButton";
import MovieListItem, { MovieCardLoading } from "../movieCard/MovieListItem";

const PersonalList = ({ type }) => {
  const [movies, setMovies] = useState();
  const { moviesHistory, moviesBookmarkData } = useSelector(
    (state) => state.personal
  );
  const isLoading = !movies;
  useEffect(() => {
    if (type == "history") {
      setMovies(moviesHistory);
    } else if (type == "bookmark") {
      setMovies(moviesBookmarkData);
    }
  }, [moviesHistory]);
  return (
    <div className="w-full movie-list relative">
      {isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={50} slidesPerView={"auto"}>
          <SwiperSlide>
            <MovieCardLoading></MovieCardLoading>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardLoading></MovieCardLoading>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardLoading></MovieCardLoading>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardLoading></MovieCardLoading>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardLoading></MovieCardLoading>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardLoading></MovieCardLoading>
          </SwiperSlide>
        </Swiper>
      )}
      <Swiper
        grabCursor={"true"}
        spaceBetween={20}
        slidesPerView={"auto"}
        fadeEffect={false}
      >
        <SlideNextButton></SlideNextButton>
        <SlidePrevButton></SlidePrevButton>
        {movies?.length > 0 &&
          movies?.map((item) => (
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

export default PersonalList;
