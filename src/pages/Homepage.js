import React, { Fragment } from "react";
import MovieList from "../components/movieList/MovieList";
import PersonalList from "../components/movieList/PersonalList";
import { useSelector } from "react-redux";


const Homepage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <Fragment>
      <section className="container flex flex-col gap-y-5 text-white mb-10">
        <div className="flex justify-between w-full">
          <span className="text-[20px]">Now Playing</span>
        </div>
        <MovieList type={"now_playing"}></MovieList>
      </section>

      <section className="container flex flex-col gap-y-5 text-white mb-10">
        <div className="flex justify-between w-full">
          <span className="text-[20px]">Top Rated</span>
        </div>
        <MovieList type={"top_rated"}></MovieList>
      </section>

      <section className="container flex flex-col gap-y-5 text-white mb-10">
        <div className="flex justify-between w-full">
          <span className="text-[20px]">Upcoming</span>
        </div>
        <MovieList type={"upcoming"}></MovieList>
      </section>

      {userInfo && (
        <section className="container flex flex-col gap-y-5 text-white mb-10">
          <div className="flex justify-between w-full">
            <span className="text-[20px]">History</span>
          </div>
          <PersonalList type={"history"}></PersonalList>
        </section>
      )}

      {userInfo && (
        <section className="container flex flex-col gap-y-5 text-white mb-10">
          <div className="flex justify-between w-full">
            <span className="text-[20px]">Bookmark</span>
          </div>
          <PersonalList type={"bookmark"}></PersonalList>
        </section>
      )}
    </Fragment>
  );
};

export default Homepage;
