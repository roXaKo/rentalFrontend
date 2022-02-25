import React, { useEffect, useState } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import FormSfc from "../formComponents/FormSfc";
import premiumSticker from "../commun/premiumSticker";
import {
  getRental,
  putRental,
  postRental,
} from "../../services/RentalsService";
import { getCustomers } from "../../services/customersService";
import { getMovies } from "../../services/movieService";

function RentalForm(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    customerName: "",
    movieTitle: "",
  });
  const [inputData, setInputData] = useState({
    customer: { name: "", phone: "", isGold: false },
    title: { title: "", dailyRentalRate: "", numberInStock: "", genre: {} },
    dateOut: "",
    dateReturned: "",
    rentalFee: "",
  });
  const [allCustomers, setAllCustomers] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [error, setError] = useState({});
  const { id } = useParams();
  const schema = {
    customerName: Joi.string(),
    movieTitle: Joi.string(),
  };
  const [customersList, setCustomersList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    if (inputData._id === undefined && id) return getterEdit();
    if (id === undefined && customersList.length === 0) return getterNew();
  });

  const getterEdit = async () => {
    const rental = await getRental(id);
    const customers = await getCustomers();
    const movies = await getMovies();
    const inputField = {
      customerName: rental.customer.name,
      movieTitle: rental.title.title,
    };
    let customersList = customers;
    let moviesList = movies;
    customersList = customersList.map((c) => (c = { data: c.name }));
    moviesList = moviesList.map((m) => (m = { data: m.title }));

    setInputData(rental);
    setData(inputField);
    setAllCustomers(customers);
    setAllMovies(movies);
    setCustomersList(customersList);
    setMoviesList(moviesList);
  };

  const getterNew = async () => {
    const customers = await getCustomers();
    const movies = await getMovies();

    let customersList = customers;
    let moviesList = movies;
    customersList = customersList.map((c) => (c = { data: c.name }));
    moviesList = moviesList.map((m) => (m = { data: m.title }));

    setAllCustomers(customers);
    setAllMovies(movies);
    setCustomersList(customersList);
    setMoviesList(moviesList);
  };

  useEffect(() => {
    if (inputData.customer !== undefined) handleDatalist();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (id) res = await putRental(id, inputData);
    if (!id) res = await postRental(inputData);
    
    if (res["name"] === "Error") return toast(res.data);
    navigate("/rentals")  };

  const handleDatalist = () => {
    let rental = { ...inputData };

    rental.customer = allCustomers.find((e) => e.name === data.customerName);
    rental.title = allMovies.find((e) => e.title === data.movieTitle);

    if (!rental.customer || !rental.title) return;
    setInputData(rental);
  };
  const { renderInput, renderButton } = FormSfc(
    data,
    error,
    setData,
    setError,
    schema
  );

  return (
    <div className="m-4">
      {id && <h1>Rental ID "{inputData._id}"</h1>}
      {!id && <h1>New Rental</h1>}
      <form onSubmit={handleSubmit}>
        <fieldset className="border rounded my-2 ">
          <legend className="m-2">Customer</legend>
          {renderInput("customerName", "Name", null, customersList)}
          <div className="m-1">Customer Details</div>{" "}
          <ul className="m-2 list-group list-group-horizontal">
            <li className="list-group-item">
              Phone: {inputData.customer.phone}
            </li>{" "}
            <li className="list-group-item">
              Premium: {premiumSticker(inputData.customer)}
            </li>{" "}
          </ul>
        </fieldset>
        <fieldset className="border rounded">
          <legend className="m-2">Movie</legend>
          {renderInput("movieTitle", "Title", null, moviesList)}
          <div className="m-1">Movie Details</div>
          <ul className="m-2 list-group list-group-horizontal">
            <li className="list-group-item">
              Number in Stock: {inputData.title.numberInStock}
            </li>{" "}
            <li className="list-group-item">
              Rate: {inputData.title.dailyRentalRate}
            </li>
          </ul>
        </fieldset>
        {inputData.dateOut && <fieldset className="border rounded my-2">
          <legend className="m-2">Rental Details</legend>
          <ul className="m-2 list-group list-group-horizontal">
            <li className="list-group-item">Date Out: {inputData.dateOut}</li>
            {inputData.dateReturned && 
              <React.Fragment>
                <li className="list-group-item">
                  Date Returned: {inputData.dateReturned}
                </li>
                <li className="list-group-item">
                  Rental Fee: {inputData.rentalFee.toString()}
                </li>
                </React.Fragment>
            }
          </ul>
        </fieldset>}
        {!inputData.dateReturned && renderButton("Save")}
        {inputData.dateReturned && <div className="mx-1">Already returned rentals can' be changed</div>}
      </form>
    </div>
  );
}

export default RentalForm;
