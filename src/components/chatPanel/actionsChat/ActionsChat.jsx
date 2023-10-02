import React from "react";
import "./ActionsChat.scss";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo.jpg";

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
      <img className="logo" src={logo} alt=""></img>
    </div>
  );
};

export default ActionsChat;
