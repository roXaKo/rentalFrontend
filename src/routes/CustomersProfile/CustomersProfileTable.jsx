import React from "react";
import Table from "../../components/table/table";
import { getUser } from "../../services/authService";
import { Link } from "react-router-dom";
import ReturnButton from "../../components/commun/ReturnButton";

function CustomersProfileTable({ rentals, sortColumn, onSort, onDelete }) {
  const user = getUser();
  const columns = [
    { path: "title", label: "Title" },
    { path: "dailyRentalRate", label: "Rate ($)" },
    { path: "dateOut", label: "Date Out" },
    { path: "dateReturned", label: "Date Returned" },
    { path: "rentalFee", label: "Fee ($)" },
    {
      key: "edit",
      content: (rental) => (
        <div className="d-flex flex-row-reverse">
          <button
            hidden={!user}
            className="btn btn-danger mx-1"
            onClick={() => onDelete(rental)}
          >
            DELETE
          </button>
          <Link className="btn btn-primary mx-1" to={`/rentals/${rental._id}`}>
            Edit
          </Link>
          <ReturnButton rental={rental}/>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={rentals}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default CustomersProfileTable;
