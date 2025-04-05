import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";

export default function IndexGenres() {
  useEffect(() => {
    console.log(urlGenres);

    axios
      .get(urlGenres)
      .then((response: AxiosResponse<genreDTO[]>) => {
        // .then((response) => {
        console.log(response.data);
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
    </>
  );
}
