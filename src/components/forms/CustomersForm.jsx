import React,{ useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getCustomer, postCustomer, putCustomer } from "../../services/customersService";
import FormSfc from "../formComponents/FormSfc";

function CustomersForm(props) {
  const navigate = useNavigate()
  const [data, setData] = useState({ name: "", phone: "", isGold: false });
  const [error, setError] = useState({});
  const { id } = useParams();

  const schema = {
    _id: Joi.string(),
    name: Joi.string().regex(/[A-Z][a-z]* [A-Z][a-z]*/),
    phone: Joi.string().regex(/[0][0-9]{3,4}[0-9]*/),
    isGold: Joi.boolean(),
  };

  const { renderInput, renderButton, renderCheckbox } = FormSfc(
    data,
    error,
    setData,
    setError,
    schema
  );

  useEffect(() => {
    if (data._id===undefined && id) return getter();
  });

  const getter = async () => {
    const customer = await getCustomer(id);
    setData(customer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res
    if (id) return res = await putCustomer(id, data);
    res = await postCustomer(data)
    if (res["name"] === "Error") return toast(res.data)
     navigate("/customers")
  };

  return (
    <div className="m-4">
      {id &&<h1>Customerdetails of "{data.name}"</h1>}
      {!id &&<h1>New Customer</h1>}
      <form onSubmit={handleSubmit}>
        {renderInput("name", "Name")}
        {renderInput("phone", "Phone")}
        {renderCheckbox("isGold", "Premium", "checkbox")}
        {renderButton("Save")}
      </form>
    </div>
  );
}

export default CustomersForm;
