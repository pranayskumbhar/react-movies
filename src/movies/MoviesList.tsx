import { movieDTO } from "./movies.models";
import IndividualMovie from "./IndividualMovie";
import css from "./MoviesList.module.css"
export default function MoviesList(props: moviesListProps) {
  return (
    <div className={css.div}>
      {
      props.movies.map((movie, index) => (
        <IndividualMovie {...movie} key={movie.id} />
      ))
      }
    </div>
  );
}

interface moviesListProps {
  movies: movieDTO[];
}
