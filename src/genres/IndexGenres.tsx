import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";
import GenericList from "../utils/GenericList";
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";

export default function IndexGenres() {
  const [genres, setGenres] = useState<genreDTO[]>([]);

  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log(urlGenres);

    axios
      .get(urlGenres, {params: {page, recordsPerPage}})
      .then((response: AxiosResponse<genreDTO[]>) => {
        // .then((response) => {

        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        console.log(response.data);
        setGenres(response.data);
      })
      .catch((exception) => {
        console.log(exception);
      });
  }, [page, recordsPerPage]);

  return (
    <>
      <h3>Genres List </h3>
      <Link className="btn btn-primary" to="/genres/create">
        Create Genre
      </Link>
      <Pagination
        currentPage={page}
        totalAmountOfPage={totalAmountOfPages}
        onChange={(newpage) => setPage(newpage)}
      />
      <GenericList list={genres}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {genres?.map((genre) => (
              <tr key={genre.id}>
                <td>
                  <Link className="btn btn-success" to={`/genre/${genre.id}`}>
                    Edit
                  </Link>
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
