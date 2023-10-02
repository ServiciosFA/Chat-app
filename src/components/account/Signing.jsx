import React, { useState } from "react";
import "./Signing.scss";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { notifActions } from "../../store/notifSlice";
import useForm from "../../hooks/useForm";
import InputField from "../../ui/inputField";

const greaterThanFive = (value) => value && value.trim().length > 5;
const isEmail = (value) => value && value.includes("@");

const Signing = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useForm(greaterThanFive);
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

  //Sign account
  const signinHandler = async (e) => {
    e.preventDefault();

    if (nameIsValid && emailIsValid && passwordIsValid) {
      try {
        setLoading(true);
        //crear usuario
        const resp = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        //Referencia al archivo en storage (imagen: name.jpg )
        const storageRef = ref(storage, name);

        //Subir archivo a la referencia del storage
        const uploadTask = await uploadBytesResumable(storageRef, file);

        //obtener url de imagen de ña referencia
        const downloadURL = await getDownloadURL(uploadTask.ref);

        //actualizar user profile
        await updateProfile(resp.user, {
          displayName: name,
          photoURL: downloadURL,
        });
        //actializar los datos del user con la imagen e id
        await setDoc(doc(db, "users", resp.user.uid), {
          uid: resp.user.uid,
          displayName: name,
          email,
          photoURL: downloadURL,
        });

        //crear coleccion para sus futuros chats en base a su id
        await setDoc(doc(db, "userChats", resp.user.uid), {});

        setLoading(false);
        dispatch(
          notifActions.ACTIVE_NOTIFICATION({
            message: "Register Succes",
            type: "success",
          })
        );
        resetName();
        resetEmail();
        resetPassword();
        navigate("/");
      } catch (err) {
        setLoading(false);
        dispatch(
          notifActions.ACTIVE_NOTIFICATION({
            message: err.message,
            type: "error",
          })
        );
      }
    }
  };

  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="accountPanelContainer">
      <form className="signinMain" onSubmit={signinHandler}>
        <div className="signinContainer">
          <h3>Register</h3>
          <InputField
            type="text"
            hasError={nameHasError}
            placeholder="Display Name"
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            errorMessage={"More than 5 characters"}
            required
          ></InputField>
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
          <input
            style={{ display: "none" }}
            className="input"
            type="file"
            id="file"
            name="avatar"
            placeholder="avatar"
            onChange={fileHandler}
          ></input>
          <label htmlFor="file" className="label">
            <PhotoSizeSelectActualOutlinedIcon></PhotoSizeSelectActualOutlinedIcon>
            Add an avatar
          </label>
          <button disabled={loading}>
            {loading ? "Loading..." : "Sign in"}
          </button>
        </div>
      </form>
      <p>
        You do have an account?{" "}
        <Link to="/login">
          <span>Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Signing;
