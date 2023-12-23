import React from "react";
import "./InputFile.scss";

const InputFile = ({ id, name, disabled = false, fileHandler, children }) => {
  return (
    <div>
      <input
        style={{ display: "none" }}
        className="inputImage"
        type="file"
        id={id}
        name={name}
        placeholder="avatar"
        onChange={fileHandler}
        disabled={disabled}
      ></input>
      <label htmlFor={id} className="labelImage">
        {children}
      </label>
    </div>
  );
};

export default InputFile;

/*
  <PhotoSizeSelectActualOutlinedIcon></PhotoSizeSelectActualOutlinedIcon>
        Add an avatar*/
