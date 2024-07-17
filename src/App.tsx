import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import IndividualMovie from "./movies/IndividualMovie";
import { landingPageDTO, movieDTO } from "./movies/movies.models";
import MoviesList from "./movies/MoviesList";
import Button from "./utils/Button";

function App() {
  const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setMovies({
        inTheaters: [
          {
            id: 1,
            title: "Harrry Potter",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQugNSHcIitXa9NIH0UIJOUhDwYKGtk58tomA&s",
          },
          {
            id: 2,
            title: "Inception",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
          },
        ],
        upcommingMovies: [
          {
            id: 3,
            title: "Predestincation",
            poster:
              "https://m.media-amazon.com/images/M/MV5BY2NhNTc1OWYtODY0Zi00YjU1LTljNGItNTAzZjY5MjJlNDdmXkEyXkFqcGdeQXVyMTU0NTE4MTkz._V1_.jpg",
          },
          {
            id: 4,
            title: "Mirzaput",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk_mRmeQJekSg2PpU-q3OlNXJA_lrZI6f9bg&s",
          },
        ],
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      {/* <Button>Whatever Text</Button> */}
      {/* <IndividualMovie {...testMovie} /> */}
      <h3> Now Playing ..</h3>
      <MoviesList movies={movies.inTheaters} />
      <h3>Upcoming movies..</h3>
      <MoviesList movies={movies.upcommingMovies} />
    </div>
  );
}

export default App;
