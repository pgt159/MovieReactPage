import genreSlice from "./GenreSlice/genreSlice";
import {combineReducers} from '@reduxjs/toolkit';
import authSlice from "./AuthSlice/authSlice";
import personalSlice from "./PersonalSlice/personalSlice";
import typeSlice from "./TypeSlice/typeSlice";

const reducer = combineReducers({
    genre: genreSlice,
    auth: authSlice,
    personal: personalSlice,
    type: typeSlice
})
export default reducer