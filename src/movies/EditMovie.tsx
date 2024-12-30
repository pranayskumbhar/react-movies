//EditMovie
import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";

export default function EditMovie() {
  return (
    <>
      <h3>Edit Movie</h3>
      <MovieForm
        model={{
          title: "Harry Potter",
          inThearters: true,
          trailer: "url",
          releaseDate : new Date('2024-11-02T00:00:00')
        }}
        onSubmit={values => {
          console.log(values)
        }}
      />
    </>
  );
}
