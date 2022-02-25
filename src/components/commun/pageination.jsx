import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Select from "../formComponents/select";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage, onPageSizeSelect }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  const pageSizeOptions= [
    {name:5, _id:5},
    {name:10, _id:10},
    {name:20, _id:20},
    {name:50, _id:50},
  ]
  return (
    <div>
      <ul className="pagination justify-content-center form-control">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className="">
          <Select
            paginate={true}
            id="pageSizeSelect"
            name="pageSizeSelect"
            value={pageSize}
            options={pageSizeOptions}
            label=""
            onChange={onPageSizeSelect}
          />
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
