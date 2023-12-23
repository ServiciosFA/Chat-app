import React from "react";
import "./UserDetail.scss";

import CardUser from "../../../ui/CardUser";
import { useSelector } from "react-redux";
import { selectImgUrl, selectuserName } from "../../../store/authSlice";

const UserDetail = () => {
  const imgUrl = useSelector(selectImgUrl);
  const userName = useSelector(selectuserName);
  return (
    <div className="userContainer">
      <CardUser imgUrl={imgUrl} name={userName}></CardUser>
    </div>
  );
};

export default UserDetail;
