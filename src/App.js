import "./App.css";
import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import { GenreProvider } from "./context/GenreContext";
import MovieSearchPage from "./pages/MovieSearchPage";
import Banner from "./components/banner/Banner";
import NotFoundPage from "./pages/NotFoundPage";
import MovieWatchPage from "./pages/MovieWatchPage";
import LoginPage from "./pages/SignUpPage";
import { AuthProvider } from "./context/AuthContext";
import SignUpPage from "./pages/SignUpPage";
import UserProfile from "./pages/UserProfile";
import ProfilePageMain from "./components/layout/ProfilePageMain";
import ChangePassword from "./pages/ChangePassword";
import { PersonalProvider } from "./context/PersonalContext";
import History from "./pages/History";
import Bookmark from "./pages/Bookmark";


const Homepage = lazy(() => import("./pages/Homepage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const GenresSearchPage = lazy(() => import("./pages/GenresSearchPage"));
// https://api.themoviedb.org/3/movie/now_playing?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US&page=1
function App() {
  return (
    <Fragment>
    
      <Suspense>
        <AuthProvider>
        <PersonalProvider>
            <GenreProvider>
              <Routes>
                <Route element={<Main></Main>}>
                  <Route
                    path="*"
                    element={<NotFoundPage></NotFoundPage>}
                  ></Route>
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
                    path="/movies/page=:page&search=:movieName"
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
                    <Route path="/account/general" element={<UserProfile></UserProfile>}></Route>
                    <Route path="/account/password" element={<ChangePassword></ChangePassword>}></Route>
                    <Route path="/account/history" element={<History></History>}></Route>
                    <Route path="/account/bookmark" element={<Bookmark></Bookmark>}></Route>
                  </Route>
                </Route>
              </Routes>
            </GenreProvider>
            </PersonalProvider>
        </AuthProvider>
      </Suspense>
    </Fragment>
  );
}

export default App;
