import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  type: "",
  message: "",
};

const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    ACTIVE_NOTIFICATION(state, action) {
      state.active = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    DESACTIVE_NOTIFICATION(state, action) {
      state.active = false;
      state.type = "";
      state.message = "";
    },
  },
});

export const notifActions = notifSlice.actions;

export const selectActive = (state) => state.chat.active;
export const selectType = (state) => state.chat.type;
export const selectMessage = (state) => state.chat.message;

export default notifSlice.reducer;
