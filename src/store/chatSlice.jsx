import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: null,
  user: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    CHANGE_USER(state, action) {
      state.user = action.payload.user;
      state.chatId = action.payload.chatId;
    },
    RESET_CHAT(state, action) {
      state.chatId = null;
      state.user = {};
    },
  },
});

export const chatActions = chatSlice.actions;

export const selectUser = (state) => state.chat.user;
export const selectChatId = (state) => state.chat.chatId;

export default chatSlice.reducer;
