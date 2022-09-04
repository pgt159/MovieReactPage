import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  bookmarkId: [],
  moviesBookmarkData: [],
  moviesHistory: [],
  currentId: "",
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {
    setHistory: (state, { payload }) => ({
      ...state,
      history: payload,
    }),
    setMoviesHistory: (state, { payload }) => ({
      ...state,
      moviesHistory: payload,
    }),
    setBookmarkId: (state, { payload }) => ({
      ...state,
      bookmarkId: payload,
    }),
    setMoviesBookmarkData: (state, { payload }) => ({
      ...state,
      moviesBookmarkData: payload,
    }),
    setCurrentId: (state, { payload }) => ({
      ...state,
      currentId: payload,
    })
  },
});

export const {
  setHistory,
  setMoviesHistory,
  setBookmarkId,
  setMoviesBookmarkData,
  setCurrentId,
} = personalSlice.actions;
export default personalSlice.reducer;
