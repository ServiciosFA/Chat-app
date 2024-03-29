import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import "./ContactSearcher.scss";
import FindedUser from "./FindedUser";
import Spinner from "../../../../ui/Spinner";
import InputField from "../../../../ui/InputField";

const ContactSearcher = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [loadingSearch, setLoading] = useState(false);

  // Evento al presionar ENTER
  const handlerKey = (e) => {
    e.code === "Enter" && searchHandler();
  };

  // Función para realizar una búsqueda insensible a mayúsculas y minúsculas
  const caseInsensitiveSearch = (value) => value.toLowerCase();

  // Buscar usuarios registrados en FAchat
  const searchHandler = async () => {
    const userFound = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      setLoading(true);
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

  // Refresh states
  const refreshHandler = () => {
    setUser(null);
    setUserName("");
  };

  if (loadingSearch) return <Spinner type={"spinner small"}></Spinner>;

  return (
    <div className="searchContainer">
      <div className="searcherInput">
        <InputField
          type="text"
          placeholder="Buscar contacto"
          onKeyDown={handlerKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          id="searcher"
        ></InputField>
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
