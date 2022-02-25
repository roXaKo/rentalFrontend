import React, { Component } from "react";
import Table from "../../components/table/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {

  columns = [
   
    {
      path: "title",
      label: "Title",
      content: (movie) =>
        this.props.user ? (
          <Link elem={movie.title} to={`/movies/${movie._id}`}>
            {movie.title}
          </Link>
        ) : (
          movie.title
        ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Number in Stock" },
    { path: "dailyRentalRate", label: "Rate ($)" },
    {
      key: "delete",
      content: (movie) => (
        <button
          hidden={!this.props.user}
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          DELETE
        </button>
      ),
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
