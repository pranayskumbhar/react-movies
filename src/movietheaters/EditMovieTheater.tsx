import { Link } from "react-router-dom";
import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater() {
  return (
    <>
      <h3> Edit Movie Theater</h3>
      <MovieTheaterForm
        model={{ name: "Raje" }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
}
