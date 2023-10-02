import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";
import notifSlice from "./notifSlice";

const store = configureStore({
  reducer: { auth: authSlice, chat: chatSlice, notif: notifSlice },
});

export default store;
