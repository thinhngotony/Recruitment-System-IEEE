import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = (props) => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
      type={props.type}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export const PrimaryButton = (props) => {
  return (
    <Button
      className={`btn-primary`}
      onClick={props.onClick ? () => props.onClick() : null}
      type={props.type}
      style={props.style}
    >
      {props.children}
    </Button>
  );
};

export const OutlineButton = (props) => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
      type={props.type}
    >
      {props.children}
    </Button>
  );
};

Button.prototype = {
  onClick: PropTypes.func,
};

export default Button;
