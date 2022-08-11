import React, { Fragment } from "react";
import Header from "../components/layout/Header";
import MovieList from "../components/movieList/MovieList";

const Homepage = () => {
  return (
    <Fragment>
      <section className="container flex flex-col gap-y-5 text-white mb-10">
        <div className="flex justify-between w-full">
          <span className="text-[20px]">Now Playing</span>

        </div>
        <MovieList
          type={ "now_playing"}
        ></MovieList>
      </section>

      <section className="container flex flex-col gap-y-5 text-white mb-10">
        <div className="flex justify-between w-full">
          <span className="text-[20px]">Top Rated</span>
        </div>
        <MovieList
          type={ "top_rated" }
        ></MovieList>
      </section>

      <section className="container flex flex-col gap-y-5 text-white mb-10">
        <div className="flex justify-between w-full">
          <span className="text-[20px]">Upcoming</span>
        </div>
        <MovieList
          type={ "upcoming" }
        ></MovieList>
      </section>
    </Fragment>
  );
};

export default Homepage;
