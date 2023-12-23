import React, { useState } from "react";
import "./Signing.scss";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { notifActions } from "../../store/notifSlice";
import useForm from "../../hooks/useForm";
import InputField from "../../ui/InputField";
import FormCard from "../../ui/FormCard";
import InputFile from "../../ui/InputFile";

const greaterThanFive = (value) => value && value.trim().length > 5;
const isEmail = (value) => value && value.includes("@");

const Signing = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgurl] = useState(null);

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

  const inputsValid = passwordIsValid && emailIsValid && nameIsValid;

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

        //obtener url de imagen de la referencia
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
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setImgurl(lector.result);
      };
      lector.readAsDataURL(archivo);
    }
  };

  return (
    <FormCard
      submitHandler={signinHandler}
      title={"Sign in"}
      needAccount={"Do you already have an account?"}
      span={"Login"}
      loading={loading}
      inputsValid={inputsValid}
      to={"/login"}
    >
      <InputField
        id="name"
        type="text"
        hasError={nameHasError}
        label="Display Name"
        placeholder="Display Name"
        value={name}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        errorMessage={"More than 5 characters"}
        required
      ></InputField>
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
      <div className="imageLayout">
        <InputFile name="avatar" id="file" fileHandler={fileHandler}>
          <PhotoSizeSelectActualOutlinedIcon></PhotoSizeSelectActualOutlinedIcon>
          <span>{!file ? "Add Avatar" : `Name: ${file.name}`}</span>
        </InputFile>
      </div>
    </FormCard>
  );
};

export default Signing;
