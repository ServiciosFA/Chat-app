import React from "react";
import "./UserDetail.scss";

import { useSelector } from "react-redux";
import { selectImgUrl, selectuserName } from "../../store/authSlice";

const UserDetail = () => {
  const imgUrl = useSelector(selectImgUrl);
  const userName = useSelector(selectuserName);

  return (
    <div className="userContainer">
      <div className="usrDescription">
        <img src={imgUrl} alt="avatar" className="imageUsr"></img>
        <p>{userName?.charAt(0).toUpperCase() + userName?.slice(1)}</p>
      </div>
    </div>
  );
};

export default UserDetail;
