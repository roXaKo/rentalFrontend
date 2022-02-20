import React from "react";

function SearchMulti({
  searchVal,
  categoryVal,
  searchCategories,
  setSearch,
  setCategory
}) {
  return (
    <div className="input-group mb-3">
      <input
        id="search"
        type="search"
        name="search"
        label="Search"
        className="form-control"
        value={searchVal}
        onChange={e=>setSearch(e.currentTarget.value)}
      />
      <select
        className="btln btn-outine-secondary dropdown-toggle"
        value={categoryVal}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onChange={e=>setCategory(e.currentTarget.value)}
      >
        {searchCategories.map((cat) => (
          <option key={cat.value} value={cat.value} className="dropdown-item">
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchMulti;
