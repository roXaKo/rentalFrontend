import React from "react";
import Form from "../formComponents/form";
import Joi from "joi-browser";
import { getGenres } from "../../services/genreService";
import { getMovie, postMovie, putMovie } from "../../services/movieService";

class MoviesForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      dailyRentalRate: "",
      numberInStock: "",
    },
    genres: [],
    error: {},
  };
  async populateGenre() {
    const genres = await getGenres();
    return this.setState({ genres });
  }
  async populateMovie(id) {
    try {
      const data = await getMovie(id);
      data.genre = data.genre._id;
      delete data.__v;
      this.setState({ data, db: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.navigate("/not-found", { replace: true });
    }
  }
  async componentDidMount() {
    const id = this.props.id;
    if (this.state.genres===null && this.state.data===null) return;
    await this.populateGenre();
    if (id) {
      await this.populateMovie(id);
    }
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    dailyRentalRate: Joi.number().required().label("Rate"),
    numberInStock: Joi.number().required().label("Number in Stock"),
  };

  doSubmit = async () => {
    this.props.navigate("/movies");
    let res;
    if (!this.props.id) res = await postMovie(this.state.data);
    else res = await putMovie(
    );

    if (res.response && res.response.status >= 300)
      this.state.data._id
        ? this.props.navigate("/movies/" + this.state.data._id)
        : this.props.navigate("/movies/new");
  };

  render() {
    const { genres } = this.state;
    return (
      <div className="justify-content-center ">
        {!this.state.db &&<h1>New Movie</h1>}
        {this.state.db &&<h1>Movie Details of "{this.state.data.title}"</h1>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres)}

          {this.renderInput("dailyRentalRate", "Rate ($)", "number")}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
