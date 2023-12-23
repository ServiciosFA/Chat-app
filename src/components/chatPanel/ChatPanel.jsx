import React from "react";
import "./ChatPanel.scss";
import UserDetail from "./userDetail/UserDetail";
import ActionsChat from "./actionsChat/ActionsChat";
import Chat from "./chatWindow/Chat";
import UserChats from "./userChats/UserChats";

const ChatPanel = () => {
  return (
    <div className="chatpanelContainer">
      <UserDetail></UserDetail>
      <ActionsChat></ActionsChat>
      <UserChats></UserChats>
      <Chat></Chat>
    </div>
  );
};

export default ChatPanel;
