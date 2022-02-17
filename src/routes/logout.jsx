import React from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../services/authService";

const Logout = (props) => {
  logout();
  return <Navigate to="/" />;
};

export default Logout;
