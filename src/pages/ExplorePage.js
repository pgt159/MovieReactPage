import React, { useState } from "react";
import { useSelector } from "react-redux";

import MoviesExplorePage from "./Movies/MoviesExplorePage";
import SeriesExplorePage from "./Series/SeriesExplorePage";

const ExplorePage = () => {
  const { currentType } = useSelector((state) => state.type);
  return (
    <>
      {currentType === "Movies" ? (
        <MoviesExplorePage></MoviesExplorePage>
      ) : (
        <SeriesExplorePage></SeriesExplorePage>
      )}
    </>
  );
};

export default ExplorePage;
