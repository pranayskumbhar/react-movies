import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { movieTheaterCreatinDTO } from "./movieTheater.model";
import * as Yup from "yup";
import Map from "../utils/Map";
import MapField from "../forms/MapField";
import coordinateDTO from "../utils/coordinates.model";

export default function MovieTheaterForm(props: MovieTheaterForm) {
    console.log(props.model)
  function transformCoordinates(): coordinateDTO[]  {
    if (props.model.latitude && props.model.longitude) {
        //alert(1)
      const response: coordinateDTO = { lat: props.model.latitude,
        lng: props.model.longitude }



      return [response];
    } 
    else {
        //alert(0)
      const response: coordinateDTO = {
        lat: 0,
        lng: 0,
      };
      return [response];
    }
  }

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
            <div style={{ marginBottom: "1rem" }}>
              <MapField
                latfield="latitude"
                lngfield="longitude"
                coordinates={transformCoordinates()}
              />
            </div>
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
