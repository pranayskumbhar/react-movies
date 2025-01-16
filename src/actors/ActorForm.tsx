import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import actorCreationDTO from "./actors.model";
import * as Yup from 'yup';
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkdownField from "../forms/MarkdownField";

export default function ActorForm(props: actorFormProps) {

  // testting for github


  return (
    <>
      <Formik 
      initialValues={props.model} 
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string().required("This is required"),
        dateOfBirth : Yup.date().nullable().required("This is required")
      })}
      >

        {
            (formikProps)=>(
                <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <TextField field={"name"} displayName={"Name"} />
                    <DateField displayName="Date of Birth" field="dateOfBirth" />
                    <ImageField displayName="Picture" field="picture" imageURL={props.model.pictureURL} />
                    <MarkdownField displayName="BioGraphy" field="biography" />
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











// import { Form, Formik, FormikHelpers, FormikValues } from "formik";
// import TextField from "../forms/TextField";
// import Button from "../utils/Button";
// import { Link } from "react-router-dom";
// import actorCreationDTO from "./actors.model";
// import * as Yup from 'yup';
// import DateField from "../forms/DateField";

// export default function ActorForm(props: actorFormProps) {
//   return (
//     <>
//       <Formik 
//       initialValues={props.model} 
//       onSubmit={props.onSubmit}
//       validationSchema={Yup.object({
//         name: Yup.string().required("This is required"),
//         dateOfBirth : Yup.date().nullable().required("This is required")
//       })}
//       >

//         {
//             (formikProps)=>(
//                 <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//                     <TextField field={"name"} displayName={"name"} />
//                     <DateField displayName="Date of Birth" field="dateOfBirth" />
//                     <Button className="btn btn-primary" disabled={formikProps.isSubmitting} type="submit">
//                     Save Changes
//                     </Button>
//                     <Link to="/actors" className="btn btn-danger">Back</Link>
//                 </Form>
//             )
//         }
//       </Formik>
//     </>
//   );
// }

// interface actorFormProps {
//   model: actorCreationDTO;
//   onSubmit(
//     values: actorCreationDTO,
//     action: FormikHelpers<actorCreationDTO>
//   ): void;
// }

