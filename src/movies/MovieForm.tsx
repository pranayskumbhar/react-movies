import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.models";
import * as Yup from "yup";
import { title } from "process";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, {
  multipleSelectorModel,
} from "../forms/MultipleSelector";
import { useState } from "react";
import { genreDTO } from "../genres/genres.model";
import { nodeModuleNameResolver } from "typescript";
import { movieTheaterCreatinDTO, movieTheaterDTO } from "../movietheaters/movieTheater.model";

export default function MovieForm(props: movieFormProps) {
  const [selectedGenres, setSelectedGenres] = useState(
    mapToModel(props.selectedGenres)
  );
  const [nonSelectedGenres, setnonSelectedGenres] = useState(
    mapToModel(props.nonSelectedGenres)
  );



  const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(
    mapToModel(props.selectedMovieTheaters)
  );
  const [nonSelectedMovieTheaters, setnonSelectedMovieTheaters] = useState(
    mapToModel(props.nonSelectedMovieTheaters)
  );



  function mapToModel(
    items: { id: number; name: string }[]
  ): multipleSelectorModel[] {
    return items.map((item) => {
      return { key: item.id, value: item.name };
    });
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, action) => {
        values.genresIds = selectedGenres.map(item => item.key)
        values.movieTheaterIds = selectedMovieTheaters.map(item => item.key)
        props.onSubmit(values, action)
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("This field is required."),
      })}
    >
      {(formikProps) => (
        <Form
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <TextField field="title" displayName="Title" />
          <CheckboxField displayName="In Theaters" field="inThearters" />
          <TextField field="trailer" displayName="Trailer" />
          <DateField displayName="Release Date" field="releaseDate" />
          <ImageField
            displayName="Poster"
            field="poster"
            imageURL={props.model.posterUrl}
          />
          <MultipleSelector
            displayName="Select Multiple"
            nonSelected={nonSelectedGenres}
            selected={selectedGenres}
            onChange={(selected, nonSelected) => {
              setSelectedGenres(selected);
              setnonSelectedGenres(nonSelectedGenres);
            }}
          />

<MultipleSelector
            displayName="Select Multiple Movie"
            nonSelected={nonSelectedMovieTheaters}
            selected={selectedMovieTheaters}
            onChange={(selected, nonSelected) => {
              setSelectedMovieTheaters(selected);
              setnonSelectedMovieTheaters(nonSelectedGenres);
            }}
          />




          <Button
            className="btn btn-primary mb-3"
            disabled={formikProps.isSubmitting}
            type="submit"
          >
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/genres">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface movieFormProps {
  model: movieCreationDTO;
  onSubmit(
    values: movieCreationDTO,
    action: FormikHelpers<movieCreationDTO>
  ): void;

  selectedGenres: genreDTO[];
  nonSelectedGenres: genreDTO[];


  selectedMovieTheaters: movieTheaterDTO[];
  nonSelectedMovieTheaters: movieTheaterDTO[];
}
