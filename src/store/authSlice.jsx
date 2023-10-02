import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  displayName: null,
  uid: null,
  photoURL: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = true;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
    },
    SET_INACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.displayName = null;
      state.email = null;
      state.uid = null;
      state.photoURL = null;
    },
  },
});

export const authActions = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectuserName = (state) => state.auth.displayName;
export const selectUserId = (state) => state.auth.uid;
export const selectImgUrl = (state) => state.auth.photoURL;
export default authSlice.reducer;
