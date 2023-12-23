import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./FormCard.scss";
import Spinner from "./Spinner";

const FormCard = ({
  children,
  submitHandler,
  title,
  needAccount,
  span,
  loading,
  inputsValid,
  to,
}) => {
  //Button render
  const buttonRender = loading ? (
    <Spinner type="spinner small"></Spinner>
  ) : (
    <Button disabled={loading || !inputsValid}>{title}</Button>
  );

  return (
    <div className="accountPanelContainer">
      <form className="formContainer" onSubmit={submitHandler}>
        <div className="inputsContainer">
          <h3 className="title">{title}</h3>
          {children}
          {buttonRender}
        </div>
      </form>
      {to && (
        <p className="formFooter">
          {`${needAccount} `}
          <Link to={to}>
            <span className="spanAccount">{span}</span>
          </Link>
        </p>
      )}
    </div>
  );
};

export default FormCard;
//You don't have an account?
