import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieListItem from "../../components/movieCard/MovieListItem";
import { tmdb } from "../../config";
import { db } from "../../firebase-config";
import useGetMovies from "../../hooks/useGetMovies";
import { useDispatch, useSelector } from "react-redux";
import {
  setHistory,
  setBookmarkId,
} from "../../redux/PersonalSlice/personalSlice";
import { setType } from "../../redux/TypeSlice/typeSlice";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [credit, setCredit] = useState([]);
  const [video, setVideo] = useState();
  const [similar, setSimilar] = useState();
  const response = useGetMovies(tmdb.getMovieDetails(movieId, null));
  const { history, currentId, bookmarkId } = useSelector(
    (state) => state.personal
  );
  const creditResponse = useGetMovies(tmdb.getMovieDetails(movieId, "credits"));
  const videoResponse = useGetMovies(tmdb.getMovieDetails(movieId, "videos"));
  const similarResponse = useGetMovies(
    tmdb.getMovieDetails(movieId, "similar")
  );
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    setMovie(response);
    setCredit(creditResponse?.cast?.slice(0, 5));
    setVideo(videoResponse);
    setSimilar(similarResponse);
    dispatch(setType("Movies"));
  }, [response, creditResponse, videoResponse, similarResponse]);
  const dispatch = useDispatch();
  const movieItem = { id: +movieId, type: "movie" };
  const isMarked = Boolean(
    bookmarkId.filter(
      (item) => JSON.stringify(item) === JSON.stringify(movieItem)
    ).length
  );
  return (
    <div className="flex flex-col gap-5 text-white pb-10">
      <div className="h-[500px] w-full top-0 left-[50%] -translate-x-2/4 absolute -z-10">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          className="opacity-20 w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="w-[50%] md:h-[600px] h-[350px] relative md:mx-auto bg-white overflow-hidden rounded-xl">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          className=" w-full h-full object-cover"
          alt=""
        />
      </div>
      <span className="md:text-[30px] text-[25px] mx-auto font-semibold">
        {movie?.title}
      </span>
      <div className="flex flex-row gap-5 justify-center">
        <button
          onClick={async () => {
            if (!userInfo) {
              toast.error("You have to be signed in to use this service");
              return;
            }
            let newArray = [...bookmarkId];
            // const index = newArray.indexOf({id: +movieId, type: 'movie'});
            // if (index > -1) {
            //   newArray.splice(index, 1);
            //   dispatch(setBookmarkId(newArray));
            //   await updateDoc(doc(db, "users", currentId), {
            //     bookmark: JSON.stringify([...newArray]),
            //   });
            //   return;
            // }
            if (isMarked) {
              newArray = newArray.filter(
                (item) => JSON.stringify(item) !== JSON.stringify(movieItem)
              );
              dispatch(setBookmarkId(newArray));
              await updateDoc(doc(db, "users", currentId), {
                bookmark: JSON.stringify([...newArray]),
              });
              return;
            }
            if (newArray.length >= 20) {
              newArray.pop();
            }
            newArray.unshift(movieItem);
            dispatch(setBookmarkId(newArray));
            await updateDoc(doc(db, "users", currentId), {
              bookmark: JSON.stringify([...newArray]),
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill={isMarked ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke={isMarked ? "none" : "currentColor"}
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <Link
          to={`/movies/${movieId}/watch`}
          className="px-6 py-3 rounded-xl hover:opacity-80 transition-all bg-primary my-2 text-white text-xl"
          onClick={async () => {
            if (!userInfo) return;
            let newArray = [...history];
            newArray = newArray.filter(
              (item) => JSON.stringify(item) !== JSON.stringify(movieItem)
            );
            if (newArray.length >= 20) {
              newArray.pop();
            }
            newArray.unshift(movieItem);
            dispatch(setHistory(newArray));
            await updateDoc(doc(db, "users", currentId), {
              history: JSON.stringify([...newArray]),
            });
          }}
        >
          Watch Now
        </Link>
      </div>

      <div className="flex flex-row justify-center flex-wrap md:gap-x-10 gap-5">
        {movie?.genres?.length > 0 &&
          movie?.genres?.map((item) => (
            <Link
              to={`/movies/page=1&searchGenre=${item.id}&type=${item.name}`}
              key={movie?.genres?.indexOf(item)}
              className="border border-tags rounded-xl text-tags flex justify-center items-center p-2 hover:text-white hover:bg-tags transition-all"
            >
              {item.name}
            </Link>
          ))}
      </div>
      <span className="w-[80%] mx-auto text-center leading-relaxed">
        {movie?.overview}
      </span>
      <span className="md:mt-0 mt-5 text-[25px] mx-auto font-semibold">
        Cast
      </span>
      <div className="flex md:flex-row flex-col md:gap-5 gap-8 lg:max-w-[1280px] md:mb-0 mb-8 h-auto mx-auto justify-center">
        {credit?.length > 0 &&
          credit?.map((item) => (
            <div
              className="md:w-[15%] flex md:flex-col flex-row gap-5 md:text-center justify-start"
              key={item.id}
            >
              <div className="md:w-full w-[80px] md:h-[250px] md:border-white md:border h-[80px] md:rounded-lg rounded-full overflow-hidden">
                {item.profile_path && (
                  <img
                    src={
                      item.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                        : null
                    }
                    className="w-full md:h-[250px] md:object-cover md:rounded-lg object-contain object-center"
                    alt=""
                  />
                )}
              </div>
              <div className="flex flex-col ">
                <span className="text-[20px]">{item.name}</span>
                as
                <span className="text-[20px]">{item.character}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="relative w-full">
        {video?.results?.length > 0 ? (
          <iframe
            className="relative left-2/4 -translate-x-2/4 md:w-[700px] w-auto"
            width="727"
            height="409"
            src={`https://www.youtube.com/embed/${
              video?.results && video?.results[0].key
            }`}
            title={video?.results[0]?.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex md:flex-row md:gap-10 flex-col gap-5 justify-center items-center">
            <div className="max-w-[300px] ">
              <img
                src={"/not-found.png"}
                className="w-full object-cover rounded-lg mx-auto"
                alt=""
              />
            </div>
            <span className=" md:text-[40px] text-xl md:leading-[45px]">
              Sorry, we could not find the trailer
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-10 md:mt-0 mt-8">
        <span className="text-2xl font-semibold mx-auto">Similar Movies</span>
        <div className="container movie-list">
          <Swiper grabCursor={"true"} spaceBetween={50} slidesPerView={"auto"}>
            {similar &&
              similar?.results?.slice(0, 6)?.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieListItem
                    name={item.title || item.name}
                    src={item.poster_path}
                    vote={item.vote_average}
                    release={item.release_date || item.first_air_date}
                    id={item.id}
                    item={item}
                    type={item.seasons}
                  ></MovieListItem>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
