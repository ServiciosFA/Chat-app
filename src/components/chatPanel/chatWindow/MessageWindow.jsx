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

const MessageWindow = () => {
  const currentUser = useSelector((state) => state.auth);
  const userChat = useSelector((state) => state.chat);

  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);

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
        },
        (error) => {
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
        }
      );
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
    }
  };

  return (
    <form className="actionChat" onSubmit={textHandler}>
      <div className="inputContainer">
        <textarea
          placeholder="Type something"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={handleKeyDown}
          disabled={!userChat?.chatId}
        ></textarea>
      </div>
      <div className="actionButtons">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          disabled={!userChat?.chatId}
        />
        <label htmlFor="file">
          <ImageIcon className="icon" disabled={!userChat?.chatId}></ImageIcon>
        </label>
        <button disabled={!userChat?.chatId}>Send</button>
      </div>
    </form>
  );
};

export default MessageWindow;
