import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { movieTheaterCreatinDTO } from "./movieTheater.model";
import * as Yup from "yup";

export default function MovieTheaterForm(props: MovieTheaterForm) {
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          name: Yup.string().required("This field is required"),
        })}
      >
        {(formikProps) => (
          <Form
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <TextField displayName="Name" field="name" />
            <Button type="submit" disabled={formikProps.isSubmitting}>
              Save Changes
            </Button>
            <Link to="/movietheaters" className="btn btn-secondary">
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface MovieTheaterForm {
  model: movieTheaterCreatinDTO;
  onSubmit(
    values: movieTheaterCreatinDTO,
    actions: FormikHelpers<movieTheaterCreatinDTO>
  ): void;
}
