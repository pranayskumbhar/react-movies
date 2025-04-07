import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import { Link, useParams } from "react-router-dom";
import Button from "../utils/Button";
import { genreCreationDTO } from "./genres.model";
import axios from "axios";
const GenreForm = (props: genreFormProp) => {

  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      
      validationSchema={Yup.object({
        name: Yup.string().required("This field is required.").max(50,"Don't exceed 50 character."),
      })}
    >
      {(formikProps) => (
        <Form
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <TextField field="name" displayName="Name" />
          <Button className="" disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/genres">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
};

interface genreFormProp {
  model: genreCreationDTO;
  onSubmit(
    values: genreCreationDTO,
    action: FormikHelpers<genreCreationDTO>  
  ): void;
}
export default GenreForm;
