import React, { useEffect, useRef } from "react";
import "./ChatItem.scss";
import { useSelector } from "react-redux";

const ChatItem = ({ item, itemKey, userChat, chat }) => {
  const currentUser = useSelector((state) => state.auth);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  return (
    <li
      ref={ref}
      key={itemKey}
      className={item.senderId === currentUser.uid ? "chatContact" : "chatUsr"}
    >
      <img
        className="avatar"
        src={
          item.senderId === currentUser.uid
            ? currentUser.photoURL
            : userChat.user.photoURL
        }
        alt=""
      ></img>
      <div
        className={
          item.senderId === currentUser.uid ? "fondoContact" : "fondoUsr"
        }
      >
        <p>{item.message}</p>
        {item.img && <img src={item.img} alt="" className="imagenChat" />}
      </div>
    </li>
  );
};

export default ChatItem;
