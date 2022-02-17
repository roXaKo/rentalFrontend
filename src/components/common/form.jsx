import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, error: {} };

  handleChange = ({ currentTarget: input }) => {
    const error = { ...this.state.error };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) error[input.id] = errorMessage;

    else delete error[input.id];
    const data = { ...this.state.data };
    
    data[input.id] = input.value;
    this.setState({ data, error });
  };

  validateProperty = ({ id, value }) => {
    const test = { [id]: value };
    const schema = { [id]: this.schema[id] };
    let { error } = Joi.validate(test, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    let { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    error.details.map((err) => (error[err.path[0]] = err.message));

    return Object.keys(error).length === 0 ? null : error;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const error = this.validate();
    this.setState({ error: error || {} });
    if (error) return;

    this.doSubmit()
  };

  renderInput(name, label, type = "text") {
    const { data, error } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={error[name]}
      />
    );
  }
  renderSelect(name, label, options) {
    const { data, error } = this.state;
    return (
      <Select
        id={name}
        name={name}
        value={data[name]}
        options={options}
        label={label}
        onChange={this.handleChange}
        error={error[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary m-1"
      >
        {label}
      </button>
    );
  }
}

export default Form;
