import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";

export default function CreateMovie() {
  return (
    <>
      <h3>Create Movie</h3>
      <MovieForm
        model={{
          title: "",
          inThearters: false,
          trailer: "",
        }}
        onSubmit={values => {
          console.log(values)
        }}
      />
    </>
  );
}
