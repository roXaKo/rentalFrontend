import React, { Component } from "react";

import _ from "lodash";

class TableBody extends Component {
  rendeCell = (column, item) => {
    return !column.content ? _.get(item, column.path) : column.content(item);
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.rendeCell(column, item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
