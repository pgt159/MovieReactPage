import React, { createContext, useContext, useState } from "react";

const FilmContext = createContext();

const FilmProvider = (props) => {
  const [movieState, setMovieState] = useState(true);
  const value = [movieState, setMovieState]
  return <FilmContext.Provider value={value} {...props}></FilmContext.Provider>;
};

const useFilm = () => {
    const context = useContext(FilmContext);
    if (typeof context === 'undefined') {
        throw new Error('Please make sure your component is in a provider')
    }
    return context;
}
export {FilmProvider, useFilm};
