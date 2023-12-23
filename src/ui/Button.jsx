import React from "react";
import "./Button.scss";

const Button = ({ disabled, children }) => {
  return (
    <button className="buttonContainer" disabled={disabled ? true : false}>
      {children}
    </button>
  );
};

export default Button;
