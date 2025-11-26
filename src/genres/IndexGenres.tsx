import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";
import GenericList from "../utils/GenericList";
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";
import RecordsPerPageSelect from "../utils/RecordsPerPageSelect";
import DisplayError from "../utils/DisplayError";
import customConfirm from "../utils/cutomConfim";

export default function IndexGenres() {
  const [genres, setGenres] = useState<genreDTO[]>([]);

  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [TotalNoOfRecords, setTotalNoOfRecords] = useState<number>(0);

  useEffect(() => {
    loadData();
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  function loadData() {
    axios
      .get(urlGenres, { params: { page, recordsPerPage } })
      .then((response: AxiosResponse<genreDTO[]>) => {
        // .then((response) => {

        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalNoOfRecords(totalAmountOfRecords);
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        console.log(response.data);
        setGenres(response.data);
      })
      .catch((exception) => {
        console.log(exception);
      });
  }

  async function deleteGenre(id: number) {
    try {
      await axios.delete(`${urlGenres}/${id}`);
      loadData();
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      console.error(error);
      if (error && error.response) {
        setErrors(error.response.data as string[]);
      }
    }
  }

  return (
    <>
      <h3>Genres List </h3>
      {errors ? <DisplayError errors={errors} /> : null}

      <Link className="btn btn-primary" to="/genres/create">
        Create Genre
      </Link>

      <RecordsPerPageSelect
        onChage={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
        TotalNoOfRecords={TotalNoOfRecords}
      />

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
                  <Link
                    className="btn btn-success"
                    to={`/genres/edit/${genre.id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => {
                      customConfirm(() => {
                        deleteGenre(genre.id);
                      });
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </Button>
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
