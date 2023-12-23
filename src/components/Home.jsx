import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="containerHome">
      <div className="descriptionLayout">
        <h3 className="descriptionTitle">Bienvenido a FA chat</h3>
        <p className="descriptionText">
          Aplicación dedicada para que puedas chatear con quienes tu quieras,
          agrega a tus contactos y empieza a disfrutar
        </p>
        <Link to="/chat">
          <button className="button">Let's Chat</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
