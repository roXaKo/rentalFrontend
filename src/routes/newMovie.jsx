import React from "react";
import MoviesForm from "../components/forms/moviesForm"

const NewMovie = (props) => {
  return (<div className="m-5">
      <h1>New Movie</h1>
      <MoviesForm {...props} />
  </div>);
};

export default NewMovie;
