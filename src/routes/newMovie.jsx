import React from "react";
import MoviesForm from "../components/forms/moviesForm"

const NewMovie = (props) => {
  return (<div className="m-5">
      <MoviesForm {...props} />
  </div>);
};

export default NewMovie;
