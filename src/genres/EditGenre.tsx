import { Link, useHistory, useParams } from "react-router-dom";
import GenreForm from "./GenreForm";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { urlGenres } from "../endpoints";
import { genreCreationDTO } from "./genres.model";
import Loading from "../utils/Loading";
import DisplayError from "../utils/DisplayError";

export default function EditGenre() {
  const { id }: any = useParams();
  const [genre, setGenre] = useState<genreCreationDTO>()
  const [errors, setErrors] = useState<string[]>([])
  const history = useHistory();

  useEffect(function () {
    axios.get(`${urlGenres}/${id}`).
      then((response: AxiosResponse<genreCreationDTO>) => {
        setGenre(response.data)
      }).catch((exception) => {
        alert(exception)
      });
  }, [])

  async function edit(genreToEdit: genreCreationDTO) {
    try {
      await axios.put(`${urlGenres}/${id}`, genreToEdit);
      history.push('/genres');
    }
    catch (axiosError) {
      const error = axiosError as AxiosError;
      console.error(error);
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3> Edit genre</h3>
      <DisplayError errors={errors} />
      {
        genre ?
          <GenreForm
            model={genre}
            onSubmit={async (value) => {
              //when the form is posted
              await edit(value);
            }}
          /> : <Loading></Loading>
      }
    </>
  );
}
