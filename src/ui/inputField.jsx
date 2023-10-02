import React from "react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage,
}) => {
  return (
    <div className="inputContainer">
      <input
        className={hasError ? "inputError" : "input"}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      ></input>
      {hasError && <label className="labelError">{errorMessage}</label>}
    </div>
  );
};

export default InputField;
