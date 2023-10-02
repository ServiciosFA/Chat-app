import React from "react";
import "./FindedUser.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { chatActions } from "../../../../store/chatSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const FindedUser = ({ user, refreshHandler, onSeterror }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth);
  //Select Chat Actions
  const selectHandler = async () => {
    //Id unico fucionando los id de los dos usuarios en la charla
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      onSeterror(false);
      //Obtener chat entre dos usuarios
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //crear un chat unico con la combinacion de ids entre dos usuarios unicamente
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //Actualizar userChats en referencia al currentId y creando un atributo con la combinacion de id que sera despues la referencia a los chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        //Actualizar userChats en referencia al userid, debe quedar registrado en los dos el chat realizado
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      dispatch(chatActions.CHANGE_USER({ user, chatId: combinedId }));
    } catch (err) {
      onSeterror(true);
      console.error(err);
    }
  };

  return (
    <div className="searchLayout">
      <div className="searchUser" onClick={selectHandler}>
        <img src={user.photoURL} alt=""></img>
        <span>{user.displayName}</span>
      </div>
      <HighlightOffIcon
        className="closeButton"
        onClick={refreshHandler}
      ></HighlightOffIcon>
    </div>
  );
};

export default FindedUser;
