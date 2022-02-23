import React from "react";

const Input = ({ name, label, error, datalist, ...rest }) => {
  return (
    <div className="form-group m-1">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        className="form-control"
        id={name}
        placeholder={label}
        className="form-control"
        list={name + "list"}
      />
      {error && <div className="alert alert-danger ">{error}</div>}
      {datalist && (
        <datalist id={name + "list"}>
          {datalist.map((d) => (
            <option key={d.data} value={d.data}>
              {d.data}
            </option>
          ))}
        </datalist>
      )}
    </div>
  );
};

export default Input;
