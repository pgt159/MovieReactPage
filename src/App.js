import "./App.css";
import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import { GenreProvider } from "./context/GenreContext";
import MovieSearchPage from "./pages/MovieSearchPage";
import Banner from "./components/banner/Banner";
import NotFoundPage from "./pages/NotFoundPage";
import { FilmProvider } from "./context/FilmContext";
import MovieWatchPage from "./pages/MovieWatchPage";
import LoginPage from "./pages/LoginPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const GenresSearchPage = lazy(() => import("./pages/GenresSearchPage"));
// https://api.themoviedb.org/3/movie/now_playing?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US&page=1
function App() {
  return (
    <Fragment>
      <Suspense>
        <FilmProvider>
          <GenreProvider>
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
                  path="/movies/page=:page&search=:movieName"
                  element={<MovieSearchPage></MovieSearchPage>}
                ></Route>
                <Route
                  path="/movies/page=:page&searchGenre=:genre&type=:type"
                  element={<GenresSearchPage></GenresSearchPage>}
                ></Route>
                <Route
                  path="/login"
                  element={<LoginPage></LoginPage>}
                ></Route>
              </Route>
            </Routes>
          </GenreProvider>
        </FilmProvider>
      </Suspense>
    </Fragment>
  );
}

export default App;
