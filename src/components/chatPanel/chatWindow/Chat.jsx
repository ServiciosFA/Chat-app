import React from "react";
import "./Chat.scss";
import ListChat from "./listChat/ListChat";
import MessageWindow from "./MessageWindow";

const Chat = () => {
  return (
    <div className="chatwindowContainer">
      <ListChat></ListChat>
      <MessageWindow></MessageWindow>
    </div>
  );
};

export default Chat;
