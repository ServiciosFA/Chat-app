import React from "react";
import "./InputField.scss";

const InputField = ({
  type,
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage,
  onKeyDown,
  id,
}) => {
  return (
    <div className="inputContainer">
      {label && (
        <label className="label" htmlFor={id}>
          {placeholder}
        </label>
      )}
      <input
        id={id}
        className={hasError ? "input error " : "input"}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        required
      ></input>
      {hasError && <label className="error label">{errorMessage}</label>}
    </div>
  );
};

export default InputField;
