import React from "react";
import "./UserChats.scss";
import ContactSearcher from "./contactSearcher/ContactSearcher";
import ChatList from "./ChatList";

const UserChats = () => {
  return (
    <div className="contactsContainer">
      <ContactSearcher></ContactSearcher>
      <hr></hr>
      <ChatList></ChatList>
    </div>
  );
};

export default UserChats;
