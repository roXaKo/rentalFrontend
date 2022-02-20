import React from "react";
import Select from "./select";
import Checkbox from "../commun/Checkbox";
import Input from "./input";
import Joi from "joi-browser";

export default function TableSfc(data, error, setData, setError, schema) {
  const handleChange = ({ currentTarget: input }) => {
    const err = { ...error };
    console.log(err);
    const errorMessage = validateProperty(input);
    console.log(errorMessage);
    err[input.id] = errorMessage;
    if (errorMessage) setError(err);
    else delete error[input.id];

    const change = { ...data };
    change[input.id] = input.value;
    setData(change);
  };

  const handleCheck = ({ currentTarget: input }) => {
    const change = { ...data };
    change[input.id] = !change[input.id];
    setData(change);
  };

  const validateProperty = ({ id, value }) => {
    const test = { [id]: value };
    const tester = { [id]: schema[id] };
    let { error } = Joi.validate(test, tester);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false };
    let { error } = Joi.validate(data, schema, options);

    if (!error) return null;
    error.details.map((err) => (error[err.path[0]] = err.message));

    return Object.keys(error).length === 0 ? null : error;
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={error[name]}
      />
    );
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        id={name}
        name={name}
        value={data[name]}
        options={options}
        label={label}
        onChange={handleChange}
        error={error[name]}
      />
    );
  };
  const renderCheckbox = (name, label) => {
    return (
      <Checkbox
        id={name}
        name={name}
        checked={data[name]}
        label={label}
        onChange={handleCheck}
        error={error[name]}
      />
    );
  };

  const renderButton = (label) => {
    return (
      <button
        disabled={validate()}
        type="submit"
        className="btn btn-primary m-1"
      >
        {label}
      </button>
    );
  };
  return {
    data,
    setData,
    renderButton,
    renderInput,
    renderSelect,
    renderCheckbox,
    handleChange,
    // handleSubmit,
    // validate,
    // validateProperty
  };
}
