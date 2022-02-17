import React from "react";

const Select = ({ error, name, options, label, ...rest }) => {
  return (
    <div className="form-group m-1">
      <label htmlFor={name}>{label}</label>
      <select {...rest} className="form-select">
        <option value="">Open this select menu</option>
        {options.map((opt) => (
          <option key={opt.name} value={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger ">{error}</div>}
    </div>
  );
};

export default Select;
