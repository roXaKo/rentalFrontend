import React from "react";

const ListGroup = ({ items, textProperty, selectedItem, valueProperty, onItemSelect }) => {
  return (
    <ul key="list" className="list-group ">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={item===selectedItem ? "list-group-item active" : "list-group-item"}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
