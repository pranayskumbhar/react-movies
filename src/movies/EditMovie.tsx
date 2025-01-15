//EditMovie
import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";

export default function EditMovie() {
  const selectedGenres: genreDTO[] = [
    { id: 1, name: "Lord shiva" },
    { id: 2, name: "Lord ganesh" },
  ];

  const nonSelectedGenres: movieTheaterDTO[] = [
    { id: 1, name: "Shiv Tandav" },
    { id: 2, name: "Bhajan" },
  ];

  const selectedMovieTheaters: movieTheaterDTO[] = [
    { id: 1, name: "Shiv Tandav" },
    { id: 2, name: "Bhajan" },
  ];

  const nonSelectedMovieTheaters: movieTheaterDTO[] = [
    { id: 3, name: "Flute" },
    { id: 4, name: "Earch" },
  ];

  return (
    <>
      <h3>Edit Movie</h3>
      <MovieForm
        model={{
          title: "Harry Potter",
          inThearters: true,
          trailer: "url",
          releaseDate: new Date("2024-11-02T00:00:00"),
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        nonSelectedGenres={nonSelectedGenres}
        selectedGenres={selectedGenres}
        nonSelectedMovieTheaters={nonSelectedMovieTheaters}
        selectedMovieTheaters={[]}
      />
    </>
  );
}
