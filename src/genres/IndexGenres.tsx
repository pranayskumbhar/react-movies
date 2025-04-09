import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";
import GenericList from "../utils/GenericList";
import Button from "../utils/Button";

export default function IndexGenres() {
  const [genres, setGenres] = useState<genreDTO[]>([]);
  useEffect(() => {
    console.log(urlGenres);

    axios
      .get(urlGenres)
      .then((response: AxiosResponse<genreDTO[]>) => {
        // .then((response) => {
        console.log(response.data);
        setGenres(response.data);
      })
      .catch((exception) => {
        console.log(exception);
      });
  }, []);

  return (
    <>
      <h3>Genres List </h3>
      <Link className="btn btn-primary" to="/genres/create">
        Create Genre
      </Link>
      <GenericList list={genres}>
        <table className="table table-striped">
          <thead>
            <th></th>
            <th>Name</th>
          </thead>
          <tbody>
            {genres?.map((genre) => (
              <tr key={genre.id}>
                <td>
                  <Link className="btn btn-success" to={`/genre/${genre.id}`}>Edit</Link>
                  <Button className="btn btn-danger">Delete</Button>
                </td>
                <td>{genre.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </>
  );
}
