import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../config";

const useGetMovies = ({type, endpoint, page}) => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(type ? `https://api.themoviedb.org/3/movie/${type}?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US&page=${page ? page : 1}` : endpoint, fetcher);
  useEffect(() => {
    setMovies(data);
  }, [data]);
  return movies;
};

export default useGetMovies;

