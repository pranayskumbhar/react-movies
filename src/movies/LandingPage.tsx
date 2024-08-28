import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from "./movies.models";

export default function LandingPage() {
  const [movies, setMovies] = useState<landingPageDTO>({
    inTheaters: [],
    upcommingMovies: [],
  });

  useEffect(function () {
    // document.title = "Loading..."
    const timer = setTimeout(() => {

      setMovies({
        inTheaters: [
          {
            id: 1,
            title: "Harry Potter",
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
            title: "Predestination",
            poster:
              "https://m.media-amazon.com/images/M/MV5BY2NhNTc1OWYtODY0Zi00YjU1LTljNGItNTAzZjY5MjJlNDdmXkEyXkFqcGdeQXVyMTU0NTE4MTkz._V1_.jpg",
          },
          {
            id: 4,
            title: "Mirzapur",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk_mRmeQJekSg2PpU-q3OlNXJA_lrZI6f9bg&s",
          },
        ],
      });
      // document.title = "Data Loaded"
    }, 4000);

     return () => {
      clearTimeout(timer);
      console.log("Componem=nt unloaded/ unmounted");
    };
  }, []);
  // const [count, setCount] = useState(0);
  // const [count1, setCount1] = useState(0);

  // useEffect(function () {
  //   console.warn("Testing every state change");
  // });



  // useEffect(function () {
  //   console.warn("on count change ");
  // }, [count]);

  // function handleclick() {
  //   setCount(count + 1);
  // }
  // function handleclick1() {
  //   setCount1(count1 + 1);
  // }

  return (
    <>
      {/* <button onClick={handleclick}>
        {" "}
        {count == 0 ? "Click Me" : "You clicked me " + count + " times"}{" "}
      </button>
  
      <button onClick={handleclick1}>
        {" "}
        {count == 0 ? "Click Me" : "You clicked me " + count1 + " times"}{" "}
      </button> */}
      <h3>Now Playing ..</h3>
      <MoviesList movies={movies.inTheaters} />
      <h3>Upcoming movies..</h3>
      <MoviesList movies={movies.upcommingMovies} />
    </>
  );
}
