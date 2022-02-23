import _ from "lodash";
import React, { useState, useEffect } from "react";
import { deleteCustomer } from "../../services/customersService";
import RentalsTable from "./RentalsTable";
import { Link } from "react-router-dom";
import SearchMulti from "../../components/commun/SearchMulti";
import Pagination from "../../components/commun/pageination";
import { paginate } from "../../components/utils/paginate";
import { getRentals } from "../../services/RentalsService";

const Rentals = (props) => {
  const searchCategories = [
    { value: "customer", name: "Customer" },
    { value: "title", name: "Title" },
    { value: "dateOut", name: "Date Out" },
  ];
  const [rentals, setRentals] = useState([]);
  const [rentalsList, setRentalsList] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [searchVal, setSearch] = useState("");
  const [categoryVal, setCategory] = useState(searchCategories[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (rentals.length === 0) getter();
  });

  const getter = async () => {
    const { data } = await getRentals();
    setRentals(data);
    let res = data;
    res = data.filter((d) => !d.dateReturned);
    res = res.map(
      (d) =>
        (d = {
          _id: d._id,
          customer: d.customer.name,
          title: d.title.title,
          dateOut: d.dateOut,
        })
    );
    setRentalsList(res);
  };

  const handleDelete = async (customer) => {
    console.log("here");
    const origCustomers = rentals;
    const del = rentals.filter((c) => c._id !== customer._id);
    setRentals(del);
    const res = await deleteCustomer(customer._id);

    if (res["name"] === "Error") setRentals(origCustomers);
  };

  const handleSort = ({ sortColumn }) => {
    setSortColumn(sortColumn);
    const sorted = _.orderBy(rentals, [sortColumn.path], [sortColumn.order]);
    setRentals(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeSelect = ({ currentTarget: input }) => {
    setPageSize(parseInt(input.value));
  };

  const getPagedData = () => {
    let data = rentalsList;

    if (searchVal) {
      const filter = new RegExp(`.*${searchVal}.*`);
      data = data.filter((t) => filter.test(t[categoryVal].toLowerCase()));
    }

    const totalCount = data.length;
    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);

    data = paginate(sorted, currentPage, pageSize);

    return { data, totalCount };
  };
  const { data, totalCount } = getPagedData();

  return (
    <div className="m-3">
      {
        <Link className="btn btn-primary my-2" to="/rentals/new">
          New Customer
        </Link>
      }
      <SearchMulti
        searchVal={searchVal}
        categoryVal={categoryVal}
        searchCategories={searchCategories}
        setSearch={setSearch}
        setCategory={setCategory}
      />
      <RentalsTable
        className="w-50"
        rentals={data}
        sortColumn={sortColumn}
        onSort={handleSort}
        onDelete={handleDelete}
      />
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeSelect={handlePageSizeSelect}
      />
    </div>
  );
};

export default Rentals;
