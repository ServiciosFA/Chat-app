import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import "./ListChat.scss";
import ChatItem from "./ChatItem";

const ListChat = () => {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const userChat = useSelector((state) => state.chat);

  //La ventana se actualiza al ultimo mensaje

  //Obtiene el chat y lo guarda en un estado para mostrar
  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (userChat.chatId) {
          setLoading(true);
          // Verificar si userChat.chatId tiene un valor
          const unsubscribe = onSnapshot(
            doc(db, "chats", userChat.chatId),
            (doc) => {
              doc.exists() && setChat(doc.data().messages);
            }
          );
          setLoading(false);
          return () => {
            unsubscribe();
          };
        }
      } catch (error) {
        setLoading(true);
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [userChat.chatId]);

  return (
    <div className="listChat">
      {loading ? (
        <p className="loadingChat">Loading...</p>
      ) : (
        <ul>
          {chat?.length > 0 &&
            chat.map((e, i) => (
              <ChatItem
                chat={chat}
                key={e.senderId + i}
                itemKey={e.senderId + i}
                item={e}
                userChat={userChat}
              ></ChatItem>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ListChat;
