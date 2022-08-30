import "./App.css";
import { Fragment, lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import MovieSearchPage from "./pages/MovieSearchPage";
import Banner from "./components/banner/Banner";
import NotFoundPage from "./pages/NotFoundPage";
import MovieWatchPage from "./pages/MovieWatchPage";
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
import { tmdb } from "./config";
import { collection, onSnapshot } from "firebase/firestore";
import { setBookmarkId, setCurrentId, setHistory, setMoviesBookmarkData, setMoviesHistory } from "./redux/PersonalSlice/personalSlice";

const Homepage = lazy(() => import("./pages/Homepage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const GenresSearchPage = lazy(() => import("./pages/GenresSearchPage"));
// https://api.themoviedb.org/3/movie/now_playing?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US&page=1
function App() {
  const dispatch = useDispatch();
  const {history, bookmarkId} = useSelector((state) => state.personal);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserInfo(currentUser));
      } else {
        dispatch(setUserInfo(''));
      }
    });
  }, []);
  useEffect(() => {
    const arr = [];
    const bookmarkArr = [];
      history.forEach((item) => {
        axios.get(tmdb.getMovieDetails(item, null)).then(res => {
            arr.push(res.data)
            dispatch(setMoviesHistory([...arr]))
        })
    });
      bookmarkId.forEach((item) => {
        axios.get(tmdb.getMovieDetails(item, null)).then(res => {
          bookmarkArr.push(res.data)
          dispatch(setMoviesBookmarkData([...bookmarkArr]))
      })
    })
  }, [history, bookmarkId]);
  const userList = collection(db, "users");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        onSnapshot(userList, (snapshot) => {
          const result = snapshot.docs.forEach((doc) => {
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
                      <Banner></Banner>
                      <Homepage></Homepage>
                    </Fragment>
                  }
                ></Route>
                <Route
                  path="/movies&page=:page"
                  element={<MoviePage></MoviePage>}
                ></Route>
                <Route
                  path="/movies/:movieId"
                  element={<MovieDetailPage></MovieDetailPage>}
                ></Route>
                <Route
                  path="/movies/:movieId/watch"
                  element={<MovieWatchPage></MovieWatchPage>}
                ></Route>
                <Route
                  path="/movies/search=:movieName"
                  element={<MovieSearchPage></MovieSearchPage>}
                ></Route>
                <Route
                  path="/movies/page=:page&searchGenre=:genre&type=:type"
                  element={<GenresSearchPage></GenresSearchPage>}
                ></Route>
                <Route
                  path="/signup"
                  element={<SignUpPage></SignUpPage>}
                ></Route>
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
