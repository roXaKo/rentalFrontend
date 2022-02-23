import React, { useEffect } from "react";
import { useState } from "react";
import {
  getCustomer,
  getRentalsOfCustomer,
} from "../../services/customersService";
import { Link, useLocation, useParams } from "react-router-dom";
import premiumSticker from "../../components/commun/premiumSticker";
import CustomersProfileTable from "./CustomersProfileTable";
import _ from "lodash";
import { deleteRental } from "../../services/RentalsService";

function CustomersProfile(props) {
  const { state } = useLocation();
  const { id } = useParams();

  const [rentals, setRentals] = useState([]);
  const [customer, setCustomer] = useState({
    _id: "",
    isGold: state.customer.isGold || "",
    name: state.customer.name || "",
    phone: state.customer.phone || "",
  });
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    if (!customer._id) return getter();
  });

  const getter = async () => {
    const customerRentals = await getRentalsOfCustomer(id);
    const customer = await getCustomer(id);

    let rentals = customerRentals;
    rentals = rentals.map(
      (r) =>
        (r = {
          _id: r._id,
          title: r.title.title,
          dailyRentalRate: r.title.dailyRentalRate,
          dateOut: r.dateOut,
          dateReturned: r.dateReturned,
          rentalFee: r.rentalFee,
        })
    );

    setRentals(rentals);
    setCustomer(customer);
  };

  const handleSort = ({ sortColumn }) => {
    setSortColumn(sortColumn);
    const sorted = _.orderBy(rentals, [sortColumn.path], [sortColumn.order]);
    setRentals(sorted);
  };

  const handleDelete = async (rental) => {
    const originalRentalList = [...rentals];
    const res = await deleteRental(id);
    const del = rentals.filter((r) => r._id === rental.id);
    setRentals(del);
    if (res["name"] === "Error") {
      setRentals(originalRentalList);
    }
  };
  return (
    <div className="m-3">
      <div>
        <h1>{customer.name}</h1>
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item">Phone: {customer.phone}</li>{" "}
          <li className="list-group-item">
            Premium: {premiumSticker(customer)}
          </li>{" "}
          <Link
            className="list-group-item btn-primary "
            to={`/customers/${customer._id}`}
          >
            Edit
          </Link>
        </ul>
      </div>
      <CustomersProfileTable
        rentals={rentals}
        sortColumn={sortColumn}
        onSort={handleSort}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default CustomersProfile;
