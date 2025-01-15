import { Link } from "react-router-dom";
import MovieTheaterForm from "./MovieTheaterForm";

export default function CreateMovieTheater() {
  return (
    <>
      <h3>Create Movie Theater</h3>
      <MovieTheaterForm
        model={{ name: ""  }}
        onSubmit={async value  => {
          //when the form is posted
          console.log(value)
          await new Promise((r) => setTimeout(r, 2000));
         }}
      />
    </>
  );
}
