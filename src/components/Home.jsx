import React from "react";
import "./Home.scss";
import image from "../assets/mainImage.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="containerHome">
      <div className="description">
        <h3>Bienvenido a Chat FA</h3>
        <p>
          Aplicación dedicada para que puedas chatear con quienes tu quieras,
          agrega a tus contactos y empieza a disfrutar
        </p>
        <Link to="/chat">
          <button className="button">Let's GO</button>
        </Link>
      </div>
      <div className="imagen">
        <img src={image} alt="imagen de chat"></img>
      </div>
    </div>
  );
};

export default Home;

/*

   {isLog ? (
        <LoginPage></LoginPage>
      ) : (
        <SigningPage onLogin={login}></SigningPage>
      )}
*/
