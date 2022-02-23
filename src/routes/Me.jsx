import React, { useEffect, useState } from "react";
import { getMe, putMe } from "../services/userService";
import FormSfc from "../components/formComponents/FormSfc";
import Joi from "joi-browser";
import { loginWithJwt } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { logout } from './../services/authService';

function Me(props) {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [data, setData] = useState({
    _id: "",
    name: "",
    password: "",
    email: "",
  });

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    name: Joi.string().required().label("Name"),
    _id: Joi.string(),
  };

  const { renderInput, renderButton } = FormSfc(
    data,
    error,
    setData,
    setError,
    schema
  );

  useEffect(() => {
    if (!data.name) getter();
  });

  const getter = async () => {
    const res = await getMe();
    let data = { _id: res._id, name: res.name, email: res.email, password: "" };
    setData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await putMe(data);
    
    logout()
    loginWithJwt(res.headers["x-auth-token"]);
    navigate("/");
  };

  return (
    <div className="m-3"> 
      <form onSubmit={handleSubmit}>
        {renderInput("email", "Email", "email")}
        {renderInput("password", "Password", "password")}
        {renderInput("name", "Name")}
        {renderButton("Submit")}
      </form>
    </div>
  );
}

export default Me;

