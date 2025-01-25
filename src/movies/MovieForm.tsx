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
import { act, useState } from "react";
import { genreDTO } from "../genres/genres.model";
import { nodeModuleNameResolver } from "typescript";
import {
  movieTheaterCreatinDTO,
  movieTheaterDTO,
} from "../movietheaters/movieTheater.model";
import TypeAheadActors from "../forms/TypeAheadActors";
import { actorMovieDTO } from "../actors/actors.model";

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

  const [selectedActors, setSelectedActors] = useState(props.selectedActor);

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
        values.genresIds = selectedGenres.map((item) => item.key);
        values.movieTheaterIds = selectedMovieTheaters.map((item) => item.key);
        props.onSubmit(values, action);
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
              setnonSelectedGenres(nonSelected);
            }}
          />

          <MultipleSelector
            displayName="Select Multiple Movie"
            nonSelected={nonSelectedMovieTheaters}
            selected={selectedMovieTheaters}
            onChange={(selected, nonSelected) => {
              setSelectedMovieTheaters(selected);
              setnonSelectedMovieTheaters(nonSelected);
            }}
          />

          <TypeAheadActors
            actors={selectedActors}
            displayName="Search Actors"
            onAdd={(actors) => {
              setSelectedActors(actors);
            }}
            //sdaskdkasj
            onRemove={(actor: actorMovieDTO) => {
              const actors = selectedActors.filter((x) => x.id !== actor.id);
              setSelectedActors(actors);
            }}
            ListUI={(actor: actorMovieDTO) => {
              return (
                <>
                  {actor.name} /{" "}
                  <input
                    placeholder="Enter an input"
                    type="text"
                 
                    value={actor.character}
                    onCanPlay={(e) => {
                      const index = selectedActors.findIndex(
                        (x) => x.id === actor.id
                      );
                      const actors = [...selectedActors];
                      actors[index].character = e.currentTarget.value;
                      setSelectedActors(actors);
                    }}
                  />
                </>
              );
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

  selectedActor: actorMovieDTO[];
}
