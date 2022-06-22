import React from "react";
import "./TextField.scss";

const TextField = (props) => {
  return (
    <div className="text-field">
      <label htmlFor={props.name} className="text-field__label">
        {props.label}
      </label>
      <input
        className="text-field__input"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextField;
