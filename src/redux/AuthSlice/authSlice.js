import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebase-config";
let initialState = {
  userInfo: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserInfo() {},
    setUserInfo: (state, { payload }) => ({
      ...state,
      userInfo: payload,
    }),
  },
});

export const { getUserInfo, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
