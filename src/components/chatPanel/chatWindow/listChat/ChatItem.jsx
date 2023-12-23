import React, { useEffect, useRef } from "react";
import "./ChatItem.scss";
import { useSelector } from "react-redux";

const ChatItem = ({ item, itemKey, userChat, chat }) => {
  const currentUser = useSelector((state) => state.auth);
  const ref = useRef();
  const chatId =
    item.senderId === currentUser.uid
      ? {
          chat: "chat chatContact",
          fondo: "fondoContact",
          img: currentUser.photoURL,
        }
      : {
          chat: "chat chatUsr",
          fondo: "fondoUsr",
          img: userChat.user.photoURL,
        };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <li ref={ref} key={itemKey} className={chatId.chat}>
      <img className="avatar" src={chatId.img} alt=""></img>
      <div className={chatId.fondo}>
        <p>{item.message}</p>
        {item.img && <img src={item.img} alt="" className="imagenChat" />}
      </div>
    </li>
  );
};

export default ChatItem;
