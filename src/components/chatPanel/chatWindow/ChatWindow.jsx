import React from "react";
import "./ChatWindow.scss";
import ListChat from "./listChat/ListChat";
import MessageWindow from "./MessageWindow";

const ChatWindow = () => {
  return (
    <div className="chatwindowContainer">
      <ListChat></ListChat>
      <MessageWindow></MessageWindow>
    </div>
  );
};

export default ChatWindow;
