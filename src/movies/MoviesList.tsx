import { movieDTO } from "./movies.models";
import IndividualMovie from "./IndividualMovie";
import css from "./MoviesList.module.css";
import Loading from "../utils/Loading";
import GenericList from "../utils/GenericList";
export default function MoviesList(props: moviesListProps) {
console.log(props.movies)

  return (
    <GenericList list={props.movies}>
      <div className={css.div}>
        {props.movies?.map((movie, index) => (
          <IndividualMovie {...movie} key={movie.id} />
        ))}
      </div>
    </GenericList>
  );
}

interface moviesListProps {
  movies?: movieDTO[];
}
