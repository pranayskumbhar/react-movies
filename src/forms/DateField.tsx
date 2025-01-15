import { useFormikContext } from "formik";

export default function DateField(props: dateFieldProps) {

    const { values, validateForm, touched , errors }: any = useFormikContext();

  return (
    <>
      <div className="mb-3">
        <label htmlFor={props.field} >{props.displayName}</label>
        <input type="date" className="form-control"
        id={props.field}
        name={props.field}
        value={
          values[props.field] 
            ? new Date(values[props.field]).toISOString().split('T')[0] 
            : new Date().toISOString().split('T')[0] 
        }
        onChange={(e) => {
          const date = e.currentTarget.value ? new Date(e.currentTarget.value) : null;
          values[props.field] = date;
          validateForm();
        }}
        />
        {touched[props.field] && errors[props.field] ? <div className="text-danger">{errors[props.field]?.toString()}</div>: null}
      </div>
    </>
  );
}

interface dateFieldProps {
  field: string;
  displayName: string;
}








// import { useFormikContext } from "formik";

// export default function DateField(props: dateFieldProps) {

//     const { values, validateForm, touched , error }: any = useFormikContext();

//   return (
//     <>
//       <div className="mb-3">
//         <label htmlFor={props.field} >{props.displayName}</label>
//         <input type="date" className="form-control"
//         id={props.field}
//         name={props.field}
//         defaultValue={values[props.field]?.toLocaleDateString("en-CA") }
//         onChange={e=>{
//             const date = new Date(e.currentTarget.value + "T00:00:00")
//             values[props.field] = date;
//             validateForm();
//         }}
//         />
//         {touched[props.field] && error[props.field] ? <div className="text-danger">error[props.field]?.toString()</div>: null}
//       </div>
//     </>
//   );
// }

// interface dateFieldProps {
//   field: string;
//   displayName: string;
// }
