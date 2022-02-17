import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import ListGroup from "../components/common/listGroup";
import MoviesTable from "../components/table/moviesTable";
import Pagination from "../components/common/pageination";
import Search from "../components/common/search";
import { paginate } from "../components/utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    search: "",
    res: "",
    selectedGenre: "",
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...(await getGenres())];
    const movies = await getMovies()
    this.setState({ movies, genres });
  }

  handleSearch = (search) => {
    search = search.toLowerCase();
    this.setState({ search, currentPage: 1, selectedGenre: null });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    deleteMovie(movie._id);
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSort = (sortColumn) => {
    this.setState(sortColumn);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, search: "" });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      search,
    } = this.state;
    let res = allMovies;
    if (search) {
      const filter = new RegExp(`.*${search}.*`);
      res = allMovies.filter((t) => filter.test(t.title.toLowerCase()));
    }

    const filtered =
      selectedGenre && selectedGenre._id
        ? res.filter((m) => m.genre._id === selectedGenre._id)
        : res;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, genres, sortColumn, search } =
      this.state;
    const {user} = this.props
    if (count === 0) return <p>There are no movies in the database.</p>;
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row g-3">
        <div className="col-2 ">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} in the database.</p>
          {user && <Link className="btn btn-primary" to="/movies/new">
            New Movie
          </Link>}
          <Search value={search} onChange={this.handleSearch} />
          <MoviesTable
            user={user}
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
