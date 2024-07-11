import { movieDTO } from "./movies.models";
import css from "./IndividualMovie.module.css";

export default function IndividualMovie(props: movieDTO) {
  const bulidLink = () => `/movie/${props.id}`;

  return (
    <div className={css.div}>
      <a href={bulidLink()}>
        <img src={props.poster} alt="poster" />
      </a>
      <p>
        <a href={bulidLink()}>{props.title}</a>
      </p>
    </div>
  );
}
