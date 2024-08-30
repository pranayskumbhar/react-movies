import { Link } from "react-router-dom";
import Button from "../utils/Button";
import { Field, Form, Formik } from "formik";

export default function CreateGenre() {
  // const history = useHistory();
  return (
    <>
      <h3>Create genre</h3>

      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(value) => {
          //when the form is posted
          console.log(value);
        }}
      >
        <Form placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <Field className="form-control" name="name" />
          </div>
          <Button type="submit">Save Changes</Button>
          <Link className="btn btn-secondary" to="/genres">
            Cancel
          </Link>
        </Form>
      </Formik>
      {/* <Button onClick={() => {
        //saving data to db
        history.push("/genres");
      }}>Save Genre</Button> */}
    </>
  );
}
