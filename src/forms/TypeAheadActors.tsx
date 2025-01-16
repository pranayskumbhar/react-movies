import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/actors.model";
import { ReactElement } from "react";

export default function TypeAheadActors(props: typeAheadActorsProps) {
  const actors: actorMovieDTO[] = [
    {
      id: 1,
      name: "Pranay",
      character: "",
      picture:
        "data:image/png;base64,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",
    },
    {
      id: 2,
      name: "Sarvesh",
      character: "",
      picture:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_5geMZRmOCfrUa0ti3dyGsEbUvWIItcsXWviNSKXPkpB2Umzxxg6vlEPS-dR-OcgXqJT9lzvNGA91sNLz69-J5CH8qCJ0US-hXwMQ1g",
    },
    {
      id: 3,
      name: "Prarthana",
      character: "",
      picture:
        "data:image/jpeg;base64,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",
    },
  ];

  const selected: actorMovieDTO[] = [];

  return (
    <div className="mb-3 mt-3">
      <label>{props.displayName}</label>
      <Typeahead
        id="typeahead"
        onChange={(actors) => {
          if (props.actors.findIndex((x) => x.id === actors[0].id) === -1) {
            props.onAdd([...props.actors, actors[0]]);
          }
          console.log(actors);
        }}
        options={actors}
        labelKey={(actor) => actor.name}
        filterBy={["name"]}
        placeholder="write name"
        minLength={1}
        selected={selected}
        renderMenuItemChildren={(actor) => (
          <>
            <img
              alt="actor"
              src={actor.picture}
              style={{
                height: "50px",
                width: "65px",
                marginRight: "10px",
                borderRadius: "5px",
              }}
            />
            <label style={{ marginLeft: "5px" }}>{actor.name}</label>
          </>
        )}
      />

      <ul className="list-group">
        {props.actors.map((actor) => (
          <li key={actor.id}
          className="list-group-item list-group-item-action"
          >
            {props.ListUI(actor)}
            <span
              className="badge badge-primary badge-pill pointer text-dark"
              onClick={() => {
                props.onRemove(actor);
              }}
            >X</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface typeAheadActorsProps {
  displayName: string;
  actors: actorMovieDTO[];
  onAdd(actors: actorMovieDTO[]): void;
  onRemove(actors: actorMovieDTO): void;
  ListUI(actor: actorMovieDTO): ReactElement;
}
