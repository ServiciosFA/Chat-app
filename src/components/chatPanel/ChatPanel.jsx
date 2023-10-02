import React from "react";
import "./ChatPanel.scss";
import UserDetail from "./UserDetail";
import ActionsChat from "./actionsChat/ActionsChat";
import ChatActual from "./chatWindow/ChatWindow";
import UserChats from "./userChats/UserChats";

const ChatPanel = () => {
  return (
    <div className="chatpanelContainer">
      <UserDetail></UserDetail>
      <ActionsChat></ActionsChat>
      <UserChats></UserChats>
      <ChatActual></ChatActual>
    </div>
  );
};

export default ChatPanel;
