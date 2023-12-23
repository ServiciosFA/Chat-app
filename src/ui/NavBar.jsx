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
import CardUser from "./CardUser";
import DropdownMenu from "./DropdownMenu";
import Logo from "./Logo";

const NavBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showOption, setShowoption] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgUrl = useSelector(selectImgUrl);
  const userName = useSelector(selectuserName);

  const barHandler = () => {
    setShowoption((showOption) => !showOption);
  };

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

  return (
    <div className="navContainer">
      <Logo logo={logo} title={"FA Chat"}></Logo>
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
          <CardUser imgUrl={imgUrl} name={userName}></CardUser>
          <KeyboardArrowDownIcon
            className="optionButton"
            onClick={barHandler}
            onMouseEnter={barHandler}
          ></KeyboardArrowDownIcon>
          {showOption && (
            <DropdownMenu
              barHandler={barHandler}
              logoutHandler={logoutHandler}
            ></DropdownMenu>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
