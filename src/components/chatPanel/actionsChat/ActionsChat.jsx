import React from "react";
import "./ActionsChat.scss";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo.jpg";
import Logo from "../../../ui/Logo";

const ActionsChat = () => {
  const userChat = useSelector((state) => state.chat.user);

  return (
    <div className="chatactionsContainer">
      <p>
        {userChat.displayName
          ? userChat.displayName[0].toUpperCase() +
            userChat.displayName.substring(1)
          : ""}
      </p>
      <Logo logo={logo}></Logo>
    </div>
  );
};

export default ActionsChat;
