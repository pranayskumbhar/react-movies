import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import actorCreationDTO from "./actors.model";
import * as Yup from 'yup';

export default function ActorForm(props: actorFormProps) {
  return (
    <>
      <Formik 
      initialValues={props.model} 
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string().required("This is required")
      })}
      >

        {
            (formikProps)=>(
                <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <TextField field={"name"} displayName={"name"} />
                    <Button className="btn btn-primary" disabled={formikProps.isSubmitting} type="submit">
                    Save Changes
                    </Button>
                    <Link to="/actors" className="btn btn-danger">Back</Link>
                </Form>
            )
        }
      </Formik>
    </>
  );
}

interface actorFormProps {
  model: actorCreationDTO;
  onSubmit(
    values: actorCreationDTO,
    action: FormikHelpers<actorCreationDTO>
  ): void;
}

