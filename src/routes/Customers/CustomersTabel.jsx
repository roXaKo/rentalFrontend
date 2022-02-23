import React from "react";
import Table from "../../components/table/table";
import { getUser } from "../../services/authService";
import { Link } from 'react-router-dom';
import premiumSticker from './../../components/commun/premiumSticker';


function CustomersTabel({ customers, sortColumn, onSort, onDelete}) {
  const user = getUser();
  const columns = [
    { path: "name", label: "Name", content:(customer =><Link className="text-decoration-none" to={`/customers/profile/${customer._id}`}  state={{customer}}>{customer.name}</Link>) },
    { path: "phone", label: "Phone" },
    {
      path: "isGold",
      label: "Premium",
      content: (customer) =>
        premiumSticker(customer)
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
