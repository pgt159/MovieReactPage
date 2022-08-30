import React, { useEffect, useState } from "react";
import { fetcher, tmdb } from "../../config";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import BannerSlide from "./BannerSlide";
import { SlideNextButton, SlidePrevButton } from "../button/SlideButton";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const { data } = useSWR(tmdb.getMovieList("upcoming"), fetcher);
  useEffect(() => {
    if (data && data.results) {
      setBanners(data);
    }
  }, [data]);
  return (
    <section className="banner h-[500px] container rounded-xl relative mb-20 select-none">
      <div className="banner-wrapper w-full h-full text-white">
        <Swiper spaceBetween={50} slidesPerView={1} grabCursor={"true"} loop={true}>
          <SlideNextButton></SlideNextButton>
          <SlidePrevButton></SlidePrevButton>
          {banners?.results?.length > 0 &&
            banners.results.map((item) => (
              <SwiperSlide key={item.id}>
                <BannerSlide
                  name={item.title}
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  tags={item.genre_ids}
                  id={item.id}
                ></BannerSlide>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
