//EditMovie
import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import { actorMovieDTO } from "../actors/actors.model";

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

  const selectedActor: actorMovieDTO[] = [
    {
      id: 1,
      name: "Pranay",
      character: "PK",
      picture:
        "data:image/png;base64,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",
    }
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
        selectedMovieTheaters={selectedMovieTheaters}
        selectedActor={selectedActor}
      />
    </>
  );
}
