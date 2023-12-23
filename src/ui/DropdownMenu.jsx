import React from "react";
import "./DropdownMenu.scss";
import { Link } from "react-router-dom";

const DropdownMenu = ({ barHandler, logoutHandler }) => {
  return (
    <ul className="optionBar" onMouseLeave={barHandler}>
      <Link onClick={barHandler} className="optionLink" to="/chat">
        <li>Chat</li>
      </Link>
      <li className="optionLink" onClick={logoutHandler}>
        Logout
      </li>
    </ul>
  );
};

export default DropdownMenu;
