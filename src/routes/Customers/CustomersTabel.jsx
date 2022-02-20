import React from "react";
import Table from "../../components/table/table";
import { getUser } from "../../services/authService";
import { Link } from 'react-router-dom';


function CustomersTabel({ customers, sortColumn, onSort, onDelete}) {
  const user = getUser();
  const columns = [
    { path: "name", label: "Name" },
    { path: "phone", label: "Phone" },
    {
      path: "isGold",
      label: "Premium",
      content: (customer) =>
        customer.isGold ? <i className="fa fa-check-circle"></i> : "",
    },
    {
      key: "edit",
      content: (customer) => (
        <div className="d-flex flex-row-reverse">
          <button
            //   hidden={!user}
            className="btn btn-danger mx-1"
            onClick={()=> onDelete(customer)}
          >
            DELETE
          </button>
          <Link className="btn btn-primary mx-1" to={`/customers/${customer._id}`}>Edit</Link>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={customers}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default CustomersTabel;
