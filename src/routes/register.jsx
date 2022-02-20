import React from "react";
import Form from "../components/forms/form";
import Joi from "joi-browser";
import { register } from "../services/userService";
import { loginWithJwt } from "../services/authService";
import { Navigate } from 'react-router-dom';
import { getUser } from "../services/authService";

class Register extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    error: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = async () => {
    try {
      const res = await register(this.state.data);
      loginWithJwt(res.headers["x-auth-token"]);
      this.props.navigate("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.email = ex.response.data;
        this.setState({ error });
      }
    }
  };
  render() {
    if (getUser()) return <Navigate to="/"/>
    return (
      <div className="m-5 logreg">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
