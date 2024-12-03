//from udemy
//import { Link } from "react-router-dom";
//import Button from "../utils/Button";
//import { Form, Formik } from "formik";
//import * as Yup from "yup";
//import TextField from "../forms/TextField";
//import configureValidation from "../Validations";
//import { promises } from "dns";
// hi hello
import { useEffect } from "react";
import GenreForm from "./GenreForm";



export default function CreateGenre() {


// useEffect(function (){
// document.title = "Test";
// }, [])



  // const history = useHistory();
  return (
    <>
      <h3>Create genre</h3>
      <GenreForm model={{name: ''}} onSubmit={async value  => {
        //when the form is posted
        console.log(value)
        await new Promise((r) => setTimeout(r, 11));
       }}
      />
      </>
  )
  
      {/* <Button onClick={() => {
        //saving data to db
        history.push("/genres");
      }}>Save Genre</Button> */}

  
}

// Form React Site
// import React from 'react';
// import { Formik, FormikHelpers, FormikErrors } from 'formik';

// interface FormValues {
//   email: string;
//   password: string;
// }

// const CreateGenre: React.FC = () => (
//   <div>
//     <h1>Anywhere in your app!</h1>
//     <Formik
//       initialValues={{ email: '', password: '' }}
//       validate={(values: FormValues) => {
//         const errors: FormikErrors<FormValues> = {};
//         if (!values.email) {
//           errors.email = 'Required';
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = 'Invalid email address';
//         }
//         return errors;
//       }}
//       onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.email}
//           />
//           {errors.email && touched.email && <div>{errors.email}</div>}
//           <input
//             type="password"
//             name="password"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.password}
//           />
//           {errors.password && touched.password && <div>{errors.password}</div>}
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </form>
//       )}
//     </Formik>
//   </div>
// );

// export default CreateGenre;

// interface FormValues {
//   email: string;
//   password: string;
// }
