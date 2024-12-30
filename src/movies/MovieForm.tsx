import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.models";
import * as Yup from "yup";
import { title } from "process";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
export default function MovieForm(props: movieFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        title: Yup.string().required("This field is required."),
      })}
    >
      {(formikProps) => (
        <Form
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <TextField field="title" displayName="Title" />
          <CheckboxField displayName="In Theaters" field="inThearters" />
          <TextField field="trailer" displayName="Trailer" />
          <DateField displayName="Release Date" field="releaseDate" />
          <ImageField
            displayName="Poster"
            field="poster"
            imageURL={props.model.posterUrl}
          />
          <Button
            className="btn btn-primary mb-3"
            disabled={formikProps.isSubmitting}
            type="submit"
          >
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/genres">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface movieFormProps {
  model: movieCreationDTO;
  onSubmit(
    values: movieCreationDTO,
    action: FormikHelpers<movieCreationDTO>
  ): void;
}
