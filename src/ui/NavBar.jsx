import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  authActions,
  selectImgUrl,
  selectIsLoggedIn,
  selectuserName,
} from "../store/authSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { notifActions } from "../store/notifSlice";
import { chatActions } from "../store/chatSlice";
import logo from "../assets/logo.jpg";

const NavBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const imgUrl = useSelector(selectImgUrl);
  const userName = useSelector(selectuserName);
  const [showOption, setShowoption] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    //Metodo Firebase para desloguear usuario
    signOut(auth)
      .then(() => {
        dispatch(authActions.SET_INACTIVE_USER());
        dispatch(chatActions.RESET_CHAT());
        barHandler();
        dispatch(
          notifActions.ACTIVE_NOTIFICATION({
            message: "Logout!!",
            type: "info",
          })
        );
        navigate("/");
      })
      .catch((error) => {
        dispatch(
          notifActions.ACTIVE_NOTIFICATION({
            message: error.message,
            type: "error",
          })
        );
        // An error happened.
      });
  };

  const barHandler = () => {
    setShowoption((showOption) => !showOption);
  };

  return (
    <div className="navContainer">
      <Link to="/" className="logoContainer">
        <img className="imageLogo" src={logo} alt=""></img>
        <h3>FA Chat</h3>
      </Link>
      <div>
        {!isLoggedIn ? (
          <div className="linkContainer">
            <Link to="/login" className="link">
              Login
            </Link>
            <Link to="/signin" className="link">
              Register
            </Link>
          </div>
        ) : (
          <div className="linkContainer">
            <img src={imgUrl} alt=""></img>
            <span>{userName.charAt(0).toUpperCase() + userName.slice(1)}</span>
            <KeyboardArrowDownIcon
              className="optionButton"
              onClick={barHandler}
              onMouseEnter={barHandler}
            ></KeyboardArrowDownIcon>
            {showOption && (
              <ul className="optionBar" onMouseLeave={barHandler}>
                <Link onClick={barHandler} className="optionLink" to="/chat">
                  <li>Chat</li>
                </Link>
                <li className="optionLink" onClick={logoutHandler}>
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
