import "./App.css";
import { Fragment, lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import MovieSearchPage from "./pages/Movies/MovieSearchPage";
import Banner from "./components/banner/Banner";
import NotFoundPage from "./pages/NotFoundPage";
import MovieWatchPage from "./pages/Movies/MovieWatchPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfile from "./pages/UserProfile";
import ProfilePageMain from "./components/layout/ProfilePageMain";
import ChangePassword from "./pages/ChangePassword";
import History from "./pages/History";
import Bookmark from "./pages/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { setUserInfo } from "./redux/AuthSlice/authSlice";
import axios from "axios";
import { flexible, tmdb } from "./config";
import { collection, onSnapshot } from "firebase/firestore";
import {
  setBookmarkId,
  setCurrentId,
  setHistory,
  setMoviesBookmarkData,
  setMoviesHistory,
} from "./redux/PersonalSlice/personalSlice";
import SeriesBanner from "./components/banner/SeriesBanner";
import { setGenreList } from "./redux/GenreSlice/genreSlice";
import SeriesSearchPage from "./pages/Series/SeriesSearchPage";
import SeriesWatchPage from "./pages/Series/SeriesWatchPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const MovieDetailPage = lazy(() => import("./pages/Movies/MovieDetailPage"));
const SeriesDetailPage = lazy(() => import("./pages/Series/SeriesDetailPage"));
const MoviesGenreSearch = lazy(() => import("./pages/Movies/MoviesGenreSearch"));
const SeriesGenreSearch = lazy(() => import("./pages/Series/SeriesGenreSearch"));

function App() {
  const dispatch = useDispatch();
  const { history, bookmarkId } = useSelector((state) => state.personal);
  const { currentType } = useSelector((state) => state.type);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserInfo(currentUser));
      } else {
        dispatch(setUserInfo(""));
      }
    });
  }, [dispatch]);
  useEffect(() => {
    const arr = [];
    const bookmarkArr = [];
    history.forEach((item) => {
      axios.get(flexible.getDetails(item.type,item.id)).then((res) => {
        arr.push(res.data);
        dispatch(setMoviesHistory([...arr]));
      });
    });
    bookmarkId.forEach((item) => {
      axios.get(flexible.getDetails(item.type,item.id)).then((res) => {
        bookmarkArr.push(res.data);
        dispatch(setMoviesBookmarkData([...bookmarkArr]));
      });
    });
  }, [history, bookmarkId, dispatch]);
  const userList = collection(db, "users");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        onSnapshot(userList, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().uid === uid) {
              dispatch(setHistory(JSON.parse(doc.data().history)));
              dispatch(setBookmarkId(JSON.parse(doc.data().bookmark)));
              dispatch(setCurrentId(doc.id));
            }
          });
        });
      }
    });
  }, []);
  useEffect(() => {
    axios
      .get(tmdb.getTypeGenre(currentType === "Movies" ? "movie" : "tv"))
      .then((res) => dispatch(setGenreList(res.data.genres)));
  }, [currentType]);
  return (
    <Fragment>
      <Suspense>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route
              path="/"
              element={
                <Fragment>
                  {currentType === "Movies" ? (
                    <Banner></Banner>
                  ) : (
                    <SeriesBanner></SeriesBanner>
                  )}
                  <Homepage></Homepage>
                </Fragment>
              }
            ></Route>
            <Route
              path="/explore&page=:page"
              element={<ExplorePage></ExplorePage>}
            ></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route
              path="/series/:movieId"
              element={<SeriesDetailPage></SeriesDetailPage>}
            ></Route>
            <Route
              path="/movies/:movieId/watch"
              element={<MovieWatchPage></MovieWatchPage>}
            ></Route>
            <Route
              path="/series/:movieId/watch&season=:season&ep=:ep"
              element={<SeriesWatchPage></SeriesWatchPage>}
            ></Route>
            <Route
              path="/movies/search=:movieName"
              element={<MovieSearchPage></MovieSearchPage>}
            ></Route>
            <Route
              path="/series/search=:movieName"
              element={<SeriesSearchPage></SeriesSearchPage>}
            ></Route>
            <Route
              path="/movies/page=:page&searchGenre=:genre&type=:type"
              element={<MoviesGenreSearch></MoviesGenreSearch>}
            ></Route>
            <Route
              path="/series/page=:page&searchGenre=:genre&type=:type"
              element={<SeriesGenreSearch></SeriesGenreSearch>}
            ></Route>
            <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
            <Route
              path="/account"
              element={<ProfilePageMain></ProfilePageMain>}
            >
              <Route
                path="/account/general"
                element={<UserProfile></UserProfile>}
              ></Route>
              <Route
                path="/account/password"
                element={<ChangePassword></ChangePassword>}
              ></Route>
              <Route
                path="/account/history"
                element={<History></History>}
              ></Route>
              <Route
                path="/account/bookmark"
                element={<Bookmark></Bookmark>}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
