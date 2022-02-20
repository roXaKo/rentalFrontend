import _ from "lodash";
import React, { useState, useEffect } from "react";
import { deleteCustomer, getCustomers } from "../../services/customersService";
import CustomersTabel from "./CustomersTabel";
import { Link } from "react-router-dom";
import SearchMulti from "../../components/commun/SearchMulti";
import Pagination from "../../components/commun/pageination";
import { paginate } from "../../components/utils/paginate";

const Customers = (props) => {
  const searchCategories = [
    { value: "name", name: "Name" },
    { value: "phone", name: "Phone" },
  ];
  const [customers, setCustomers] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [searchVal, setSearch] = useState("");
  const [categoryVal, setCategory] = useState(searchCategories[0].value);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  useEffect(() => {
    if (customers.length === 0) getter();
  });

  const getter = async () => {
    const res = await getCustomers();
    console.log(res);
    setCustomers(res.data);
  };
  const handleSearch = (search) => {
    search = search.toLowerCase();
    this.setState({ search, currentPage: 1, selectedGenre: null });
  };

  const handleDelete = async (customer) => {
    console.log("here");
    const origCustomers = customers;
    const del = customers.filter((c) => c._id !== customer._id);
    setCustomers(del);
    const res = await deleteCustomer(customer._id);

    if (res["name"] === "Error") setCustomers(origCustomers);
  };

  const handleSort = ({ sortColumn }) => {
    setSortColumn(sortColumn);
    const sorted = _.orderBy(customers, [sortColumn.path], [sortColumn.order]);
    setCustomers(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
 
  const handlePageSizeSelect = ({ currentTarget: input }) => {
    setPageSize(parseInt(input.value))
  }

  const getPagedData = () => {
    let data = customers;

    if (searchVal) {
      const filter = new RegExp(`.*${searchVal}.*`);
      data = customers.filter((t) => filter.test(t[categoryVal].toLowerCase()));
    }

    const totalCount = data.length
    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);

    data = paginate(sorted, currentPage, pageSize);

    return {data, totalCount};
  };
  const {data, totalCount} = getPagedData();

  return (
    <div className="m-3">
      {
        <Link className="btn btn-primary my-2" to="/customers/new">
          New Customer
        </Link>
      }
      <SearchMulti
        searchVal={searchVal}
        categoryVal={categoryVal}
        searchCategories={searchCategories}
        setSearch={setSearch}
        setCategory={setCategory}
        onChange={handleSearch}
      />
      <CustomersTabel
        className="w-50"
        customers={data}
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

export default Customers;
