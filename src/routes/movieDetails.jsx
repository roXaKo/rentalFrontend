import React from "react";
import { useParams } from "react-router-dom";
import MoviesForm from "../components/moviesForm";

const MovieDetails =  (props) => {
  const { id } = useParams();
  console.log(props)
  return (
    <div>
      <h1>Movie Details of "{props.elem}"</h1>
      <MoviesForm id={id} {...props} />
      {/* <button className="btn btn-primary" onClick={()=>navigate('/movies')}>Save</button> */}
    </div>
  );
};

export default MovieDetails;
