import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../config";
import useGetMovies from "../hooks/useGetMovies";
import axios from "axios";

const MovieWatchPage = () => {
  const movieId = useParams().movieId;
  const [movieLink, setMovieLink] = useState("");

  const loading = !movieLink;
  console.log(loading);
  const movies = useGetMovies(tmdb.getMovieDetails(movieId));
  useEffect(() => {
    axios
      .get("https://2embed.org/embed/movie?tmdb=503017")
      .then(function (response) {
        setMovieLink(response);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="flex flex-row justify-between overflow-hidden">
        <div className="flex-grow max-w-[720px]  relative pb-[56.25%]">
          <iframe
            id="iframe"
            src={`https://www.2embed.to/embed/tmdb/movie?id=${movieId}`}
            className="absolute h-[70%] w-full top-0 left-0"
            frameborder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="w-[400px] flex-shrink-0">Hello</div>
      </div>
    </>
  );
};

export default MovieWatchPage;
