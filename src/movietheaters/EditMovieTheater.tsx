import { Link } from "react-router-dom";
import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater() {
  return (
    <>
      <h3> Edit Movie Theater</h3>
      <MovieTheaterForm
        model={{
          name: "Raje",
          latitude: 73.00357818592602,
          longitude: 72.99716,
        }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
}
