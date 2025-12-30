import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import GenericList from "./GenericList";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./cutomConfim";
import DisplayError from "./DisplayError";
import RecordsPerPageSelect from "./RecordsPerPageSelect";
import Pagination from "./Pagination";

interface indexEntityProps<T> {
  url: string;
  createURL: string;
  title: string;
  entityName: string;
  children: (entity: T) => React.ReactNode;
}

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [genres, setGenres] = useState<T[]>([]);

  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [TotalNoOfRecords, setTotalNoOfRecords] = useState<number>(0);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  function loadData() {
    axios
      .get(props.url, { params: { page, recordsPerPage } })
      .then((response: AxiosResponse<T[]>) => {
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
      await axios.delete(`${props.url}/${id}`);
      loadData();
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      console.error(error);
      if (error && error.response) {
        setErrors(error.response.data as string[]);
      }
    }
  }

  const buttons = (genre: T) => (
    <>
      <Link className="btn btn-success" to={`/${props.entityName}/edit/${(genre as any).id}`}>
        Edit
      </Link>
      <Button
        onClick={() => {
          customConfirm(() => {
            deleteGenre((genre as any).id);
          });
        }}
        className="btn btn-danger"
      >
        Delete
      </Button>
    </>
  );

  return (
    <>
      <h3>{props.title}</h3>
      {errors ? <DisplayError errors={errors} /> : null}

      <Link className="btn btn-primary" to={props.createURL}>
        Create {props.entityName}
      </Link>

      <RecordsPerPageSelect
        onChage={(recordsPerPage: number) => {
          setPage(1);
          setRecordsPerPage(recordsPerPage);
        }}
        TotalNoOfRecords={TotalNoOfRecords}
      />

      <Pagination
        currentPage={page}
        totalAmountOfPage={totalAmountOfPages}
        onChange={(newpage: number) => setPage(newpage)}
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
            {genres.map((genre) => (
              <tr key={(genre as any).id}>
                <td>
                  {buttons(genre)}
                </td>
                <td>{props.children(genre)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </>
  );
}

interface indexEntityProps<T> {
  // url: string;
  // entityName: string;
}
