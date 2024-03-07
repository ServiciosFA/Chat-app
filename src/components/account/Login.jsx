import React, { useState } from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { notifActions } from "../../store/notifSlice";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";

import FormCard from "../../ui/FormCard";
import InputField from "../../ui/InputField";

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
    // reset: resetEmail,
  } = useForm(isEmail);
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    //  reset: resetPassword,
  } = useForm(greaterThanFive);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const inputsValid = passwordIsValid && emailIsValid;

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //metodo de firebase para logear un usr con nuestras input
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //Establecer usuario logueado
          dispatch(authActions.SET_ACTIVE_USER(user));
          dispatch(
            notifActions.ACTIVE_NOTIFICATION({
              message: "Login success",
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
    <FormCard
      submitHandler={loginHandler}
      title={"Login"}
      needAccount={"You don't have an account?"}
      span={"Register"}
      loading={loading}
      inputsValid={inputsValid}
      to={"/signin"}
    >
      <InputField
        id="email"
        type="mail"
        value={email}
        label="Email"
        placeholder="Email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        hasError={emailHasError}
        errorMessage={"It must include @"}
        required
      ></InputField>
      <InputField
        id="pass"
        hasError={passwordHasError}
        type="password"
        label="Password"
        placeholder="Password"
        value={password}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        errorMessage={"More than 5 characters"}
        required
      ></InputField>
    </FormCard>
  );
};

export default Login;
