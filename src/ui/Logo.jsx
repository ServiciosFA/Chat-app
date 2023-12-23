import React from "react";
import "./Logo.scss";
import { Link } from "react-router-dom";

const Logo = ({ logo, title }) => {
  return (
    <Link to="/" className="logoContainer">
      <img className="imageLogo" src={logo} alt=""></img>
      <h3 className="titleLogo">{title}</h3>
    </Link>
  );
};

export default Logo;
