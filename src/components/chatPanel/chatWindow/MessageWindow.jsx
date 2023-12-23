import React, { useState } from "react";
import "./MessageWindow.scss";
import { useSelector } from "react-redux";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import ImageIcon from "@mui/icons-material/Image";
import { db, storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  ref as refe,
  uploadBytesResumable,
} from "firebase/storage";
import Button from "../../../ui/Button";
import InputFile from "../../../ui/InputFile";
import Spinner from "../../../ui/Spinner";

const MessageWindow = () => {
  const currentUser = useSelector((state) => state.auth);
  const userChat = useSelector((state) => state.chat);
  const [isLoading, setIsloading] = useState(false);

  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgurl] = useState(null);

  //Apretar enter y permitir bajar de linea (shift+enter)
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      textHandler(event);
    }
  };

  //Guardar mensaje en db y si hay imagen en store
  const textHandler = async (e) => {
    if (e) e.preventDefault();
    setIsloading(true);
    //Referencia al chat por Id
    const chatDocRef = doc(db, "chats", userChat.chatId);
    //Referencia a chat del currentUser
    const userChatDocRef = doc(db, "userChats", currentUser.uid);
    //Referencia a chat del user
    const recipientChatDocRef = doc(db, "userChats", userChat.user.uid);

    if (img) {
      //Referencia al storage con un id generado aleatoriamente
      const storageRef = refe(storage, uuid());
      //Guarda imagen en store
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Escucha el progreso de la carga de la imagen
          setIsloading(true);
        },
        (error) => {
          setIsloading(false);
          // Maneja los errores de la carga de la imagen
        },
        () => {
          // La carga de la imagen se ha completado exitosamente
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(chatDocRef, {
              messages: arrayUnion({
                id: uuid(),
                message,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
          setMessage("");
          setIsloading(false);
        }
      );
      setIsloading(false);
      setImg(null);
      setImgurl(null);
    } else {
      //Agrega el mensaje a la refencia del chat
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          id: uuid(),
          message,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      //En la referencia al chat del current user agrega el mensaje
      await updateDoc(userChatDocRef, {
        [userChat.chatId + ".lastMessage"]: { message },
        [userChat.chatId + ".date"]: serverTimestamp(),
      });
      //En la referencia al chat del user agrega el mensaje
      await updateDoc(recipientChatDocRef, {
        [userChat.chatId + ".lastMessage"]: { message },
        [userChat.chatId + ".date"]: serverTimestamp(),
      });
      setMessage("");
      setIsloading(false);
    }
  };

  const fileHandler = (event) => {
    setImg(event.target.files[0]);
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
    <form className="actionChat" onSubmit={textHandler}>
      {isLoading ? (
        <div className="inputContainer">
          <Spinner type="spinner small"></Spinner>
        </div>
      ) : (
        <div className="inputContainer">
          <textarea
            placeholder="Type something"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={handleKeyDown}
            disabled={!userChat?.chatId || isLoading}
            className="textChat"
          ></textarea>
          {img ? (
            <div className="imageMessageContainer">
              <img src={imgUrl} alt="img" className="imageText"></img>
              <p className="imageDescription">{img.name}</p>
            </div>
          ) : (
            <InputFile
              id="file"
              name="imageFile"
              disabled={!userChat?.chatId}
              fileHandler={fileHandler || isLoading}
            ></InputFile>
          )}
        </div>
      )}
      <div className="actionButtons">
        <ImageIcon
          className="icon"
          disabled={!userChat?.chatId || isLoading}
        ></ImageIcon>
        <Button disabled={!userChat?.chatId || isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </Button>
      </div>
    </form>
  );
};

export default MessageWindow;
