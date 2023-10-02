import React, { useState } from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { notifActions } from "../../store/notifSlice";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import InputField from "../../ui/inputField";

const greaterThanFive = (value) => value && value.trim().length > 5;
const isEmail = (value) => value && value.includes("@");

const Login = (props) => {
  //Control de inputs con customHook
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useForm(isEmail);
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useForm(greaterThanFive);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const inputsValid = passwordIsValid && emailIsValid;

  const loginHandler = (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      //metodo de firebase para logear un usr con nuestras input
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //Establecer usuario logueado
          dispatch(authActions.SET_ACTIVE_USER(user));
          dispatch(
            notifActions.ACTIVE_NOTIFICATION({
              message: "Login success!!",
              type: "success",
            })
          );
          setLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          const errorMessage = error.message;
          dispatch(
            notifActions.ACTIVE_NOTIFICATION({
              message: errorMessage,
              type: "error",
            })
          );
        });
    } catch (err) {}
  };

  return (
    <div className="accountPanelContainer">
      <form className="loginMain" onSubmit={loginHandler}>
        <div className="loginContainer">
          <h3>Login</h3>
          <InputField
            type="mail"
            value={email}
            placeholder="Email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            hasError={emailHasError}
            errorMessage={"It must include @"}
            required
          ></InputField>
          <InputField
            hasError={passwordHasError}
            type="password"
            placeholder="Pass"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            errorMessage={"More than 5 characters"}
            required
          ></InputField>
          <button disabled={loading || !inputsValid}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
      <p>
        You don't have an account?{" "}
        <Link to="/signin">
          <span>Register</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
