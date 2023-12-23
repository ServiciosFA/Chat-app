import React, { useEffect, useState } from "react";
import "./ChatList.scss";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { chatActions } from "../../../store/chatSlice";
import CardUser from "../../../ui/CardUser";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const currentUser = useSelector((state) => state.auth);
  const chatUser = useSelector((state) => state.chat.user);
  const dispatch = useDispatch();

  const sortedChats = chats
    ? Object.values(chats).sort((a, b) => b.date?.seconds - a.date?.seconds)
    : [];

  //Obtencion de chats del usuario
  useEffect(() => {
    const fetchChats = () => {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unSub();
      };
    };
    currentUser.uid && fetchChats();
  }, [currentUser.uid]);

  const chatHandler = (e) => {
    const combinedId =
      currentUser.uid > e.userInfo.uid
        ? currentUser.uid + e.userInfo.uid
        : e.userInfo.uid + currentUser.uid;

    dispatch(chatActions.CHANGE_USER({ user: e.userInfo, chatId: combinedId }));
  };
  return (
    <ul className="listContact">
      {sortedChats.map((e, i) => (
        <li
          key={i}
          className={
            chatUser.uid === e.userInfo.uid ? "chat activeChat" : "chat"
          }
          onClick={() => chatHandler(e)}
        >
          <CardUser imgUrl={e.userInfo.photoURL} name={e.userInfo.displayName}>
            <p className="lastChat">{e?.lastMessage?.message}</p>
          </CardUser>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
