import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { fetcher, tmdb } from "../../config";
import useSWRInfinite from "swr/infinite";
import { tmdbSeries } from "../../config";
import MovieCard, { MovieCardLoading } from "../../components/movieCard/MovieCard";

const SeriesExplorePage = () => {
  const page = useParams().page;
  const [url] = useState(tmdbSeries.getSeriesList("popular", page));
  const { data, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const series = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < 20);
  const loading = !series;

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
            {series?.length > 0 &&
              series.map((item) => (
                <div
                  className="md:w-[250px] w-[45%] flex-shrink-0"
                  key={v4()}
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

export default SeriesExplorePage;
