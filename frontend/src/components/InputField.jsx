import React from "react";
import "../styles/InputField.css";

export default function InputField({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-field ${className}`}
      {...props} // allows extra props like required, minLength, etc.
    />
  );
}
