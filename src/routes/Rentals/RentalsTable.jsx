import React from "react";
import Table from "../../components/table/table";
import { getUser } from "../../services/authService";
import { Link } from "react-router-dom";
import ReturnButton from "../../components/commun/ReturnButton";

function RentalsTable({ rentals, sortColumn, onSort, onDelete }) {
  const user = getUser()
  const columns = [
    { path: "customer", label:"Customer" },
    { path: "title", label: "Title" },
    {
      path: "dateOut",
      label: "Date Out",
    },
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
          <Link
            className="btn btn-primary mx-1"
            to={`/rentals/${rental._id}`}
          >
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

export default RentalsTable;
