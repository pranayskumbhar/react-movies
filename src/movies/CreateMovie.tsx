import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";
import { genreDTO } from "../genres/genres.model";
import { movieCreationDTO } from "./movies.models";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";

export default function CreateMovie() {

  const nonSelectedGenres : genreDTO[] = [
    {id: 1, name: 'Lord shiva'},
    {id: 2, name: 'Lord ganesh'},
    {id: 3, name: 'Lord krishna'},
    {id: 4, name: 'Lord vishnu'},
  ]



  const nonSelectedMovieTheaters : movieTheaterDTO[] = [
    {id: 1, name: 'Shiv Tandav'},
    {id: 2, name: 'Bhajan'},
    {id: 3, name: 'Flute'},
    {id: 4, name: 'Earch'},
  ]




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

        nonSelectedGenres={nonSelectedGenres}
        selectedGenres={[]}

        nonSelectedMovieTheaters={nonSelectedMovieTheaters}
        selectedMovieTheaters={[]}



      />
    </>
  );
}
