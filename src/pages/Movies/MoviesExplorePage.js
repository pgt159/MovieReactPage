import React, {useState} from "react";
import MovieCard, {
  MovieCardLoading,
} from "../../components/movieCard/MovieCard";
import { fetcher, tmdb } from "../../config";
import useSWRInfinite from "swr/infinite";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setType } from "../../redux/TypeSlice/typeSlice";

const MoviesExplorePage = () => {
  const [url] = useState(tmdb.getMovieList("popular"));
  const { data, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setType('Movies'))
  },[])
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < 20);
  const loading = !movies;
  return (
    <>
      {loading ? (
        <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
          {new Array(20).fill(0).map((item) => (
            <div className="md:w-[300px] w-[45%] flex-shrink-0" key={v4()}>
              <MovieCardLoading></MovieCardLoading>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
            {movies?.length > 0 &&
              movies.map((item) => (
                <div
                  className="md:w-[250px] w-[48%] flex-shrink-0"
                  key={item.id}
                >
                  <MovieCard
                    name={item.title || item.name}
                    src={item.poster_path}
                    vote={item.vote_average}
                    release={item.release_date || item.first_air_date}
                    id={item.id}
                  ></MovieCard>
                </div>
              ))}
          </div>
          <button
            className={`text-white bg-primary hover:opacity-80 transition-all mx-auto mt-10 
          block px-4 py-3 rounded-lg ${
            isReachingEnd ? "opacity-50 pointer-events-none" : ""
          }`}
            onClick={() => {
              if (isReachingEnd) {
                return null;
              } else {
                setSize(size + 1);
              }
            }}
          >
            Load more
          </button>
        </>
      )}
    </>
  );
};

export default MoviesExplorePage;
