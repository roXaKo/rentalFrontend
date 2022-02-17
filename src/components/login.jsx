import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getUser, login } from "../services/authService";
import { Navigate } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    error: {},
  };

  schema = {
    email: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await login(this.state.data);
      window.location.reload()
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.email = ex.response.data;
        this.setState({ error });
      }
    }
  };
  render() {
    if (getUser()) return <Navigate to="/" />;
    return (
      <div
        className="dropdown-menu logreg"
        aria-labelledby="dropdownMenuButton1"
      ><div className="m-3">
        
          <h1>Login</h1>
          <form  onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
      </div>
      </div>
    );
  }
}

export default Login;
