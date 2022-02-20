import React from "react";

const Checkbox = ({ name, label, error,...rest }) => {
  return (
    <div className="form-group m-1">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name}  type="checkbox" />
    </div>
  );
};

export default Checkbox;
