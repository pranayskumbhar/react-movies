import React from "react";
import { genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";

export default function IndexGenres() {
  return (
    <IndexEntity<genreDTO>
      url={urlGenres}
      createURL="/genres/create"
      title="Genres List"
      entityName="genres"
    >
      {(genre) => genre.name}
    </IndexEntity>
  );
}
 