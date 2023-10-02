import React, { useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import "./ContactSearcher.scss";
import SearchIcon from "@mui/icons-material/Search";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import FindedUser from "./FindedUser";

const ContactSearcher = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [loadingSearch, setLoading] = useState(false);

  //Evento al presionar ENTER
  const handlerKey = (e) => {
    e.code === "Enter" && searchHandler();
  };
  //Buscar usuarios registrados en FAchat

  const searchHandler = async (e) => {
    //consulta a users para buscar por nombre
    const userFound = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      setLoading(true);
      //Obtener usuario encontrado segun la consulta
      const querySnapshot = await getDocs(userFound);
      if (querySnapshot.empty) setUser(null);
      else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  //refresh states
  const refreshHandler = () => {
    setUser(null);
    setUserName(null);
  };

  return (
    <div className="searchContainer">
      <div className="searcherInput">
        <input
          type="text"
          placeholder="Find a contact"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handlerKey}
          id="searcher"
        ></input>
        <button onClick={searchHandler}>
          {loadingSearch ? (
            <FindReplaceIcon></FindReplaceIcon>
          ) : (
            <SearchIcon></SearchIcon>
          )}
        </button>
      </div>
      {user && !error && (
        <FindedUser
          user={user}
          refreshHandler={refreshHandler}
          onSeterror={setError}
        ></FindedUser>
      )}
    </div>
  );
};

export default ContactSearcher;
