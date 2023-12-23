import React from "react";
import "./CardUser.scss";

const CardUser = ({ imgUrl, name, children, onClick }) => {
  return (
    <div className="usrDescription" onClick={onClick}>
      <img src={imgUrl} alt="avatar" className="imageUsr"></img>
      <div className={onClick ? "userInfo" : ""}>
        <p>{name?.charAt(0).toUpperCase() + name?.slice(1)}</p>
        {children}
      </div>
    </div>
  );
};

export default CardUser;
