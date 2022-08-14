import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../config";

const useGetMovies = (endpoint) => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(endpoint, fetcher);
  useEffect(() => {
    setMovies(data);
  }, [data]);
  return movies;
};

export default useGetMovies;

