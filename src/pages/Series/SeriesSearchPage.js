import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetcher, tmdbSeries } from "../../config";
import { v4 } from "uuid";
import MovieCard, { MovieCardLoading } from "../../components/movieCard/MovieCard";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setType } from "../../redux/TypeSlice/typeSlice";

const SeriesSearchPage = () => {
  const dispatch = useDispatch()
  const movieName = useParams().movieName;
  const [url] = useState(tmdbSeries.getSeriesSearchPage(movieName)) 
  const { data, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  useEffect(() => {
    dispatch(setType('Series'))
  },[])
  const series = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const isEmpty = data?.[0]?.results?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data?.length - 1]?.results?.length < 20);
  const loading = !series;

  return (
    <div className="">
      {loading ? (
        <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
          {new Array(20).fill(0).map((item) => (
            <div className="md:w-[300px] w-[45%] flex-shrink-0" key={v4()}>
              <MovieCardLoading></MovieCardLoading>
            </div>
          ))}
        </div>
      ) : series?.length > 0 ? (
        <>
          <div className="w-full h-auto text-white flex flex-wrap flex-row md:gap-7 gap-3 justify-center">
            {series?.length > 0 &&
              series?.map((item) => {
                if (
                  item?.name &&
                  item?.poster_path &&
                  item?.vote_average &&
                  item?.first_air_date &&
                  item?.id
                ) {return (
                    <div
                      className="md:w-[240px] w-[40%] flex-shrink-0"
                      key={item.id}
                    >
                      <MovieCard
                        name={item?.name}
                        src={item?.poster_path}
                        vote={item?.vote_average}
                        release={item?.first_air_date}
                        id={item?.id}
                        item={item}
                      ></MovieCard>
                    </div>
                  )};
              })}
          </div>

          <button
            className={`text-white bg-primary hover:opacity-80 transition-all mx-auto mt-10 
          block px-4 py-3 rounded-lg ${
            isReachingEnd ? "opacity-50 pointer-events-none" : ""
          }`}
            onClick={() => {
              if (isReachingEnd) {return null} else {setSize(size + 1)};
            }}
          >
            Load more
          </button>
        </>
      ) : (
        <span className="text-white text-2xl text-center mt-10 block">
          There is no result for{" "}
          <span className="text-primary italic">{movieName}</span>
        </span>
      )}
    </div>
  );
};

export default SeriesSearchPage;
