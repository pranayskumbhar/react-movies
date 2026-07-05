import React from "react";
import IndexEntity from "../utils/IndexEntity";
import { actorDTO } from "./actors.model";
import { urlActors } from "../endpoints";

export default function IndexActors() {
  return (
    <IndexEntity<actorDTO>
      url={urlActors}
      createURL="/actors/create"
      title="Actors List"
      entityName="actors"
    >
      {(actor) => actor.name}
    </IndexEntity>
  );
}
