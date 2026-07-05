import React from "react";
import { Link } from "react-router-dom";
import IndexEntity from "../utils/IndexEntity";
import { actorDTO } from "./actors.model";
import { urlActors } from "../endpoints";
export default function IndexActors() {
  return (
    
    <IndexEntity<actorDTO>
      url={urlActors}
      createURL="actors/create"
      title="Actors List"
      entityName="Actor"
    >
 

      {(actors, buttons) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {actors?.map((actor) => (
              <tr key={actor.id}>
                <td>{buttons(actor)}</td>
                <td>{actor.name}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
