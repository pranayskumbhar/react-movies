import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { genreDTO } from "../genres/genres.model";
import Button from "../utils/Button";

export default function FilterMovies() {
  const initialValues: FilterMoviesForm = {
    title: "",
    genreId: 0,
    upcomingRelease: false,
    inTheaters: false,
  };


const genres:genreDTO[] = [
  {id: 1 , name:"Drama"},
  {id: 2 , name:"Comedy"},
  {id: 3 , name:"Horror"},
  {id: 4 , name:"Romantic"},
]


  return (
    <>
      <h3>Filter Movies </h3>
      <Formik initialValues={initialValues} onSubmit={(ok) => console.log(ok)}>
        {(formikProps) => (
          <Form
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="row gx-3 align-items-center">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Title of the movie."
                  {...formikProps.getFieldProps("title")}
                />
              </div>

              <div className="col-auto">
                <select className="form-select" 
                {...formikProps.getFieldProps("genreId")}
                >
                  <option value="0">-- Choose a Genre -- </option>
                  {
                    genres.map(genres=> <option value={genres.id}>{genres.name}</option>)
                  }
                </select>
              </div>


              <div className="col-auto">
                 <div className="form-check">
                  <Field className="form-check-input" id="upcommingReleases"
                  name="upcommingReleases" type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="upcommingReleases">Upcomming Releases</label>
                 </div>
              </div>


              <div className="col-auto">
                 <div className="form-check">
                  <Field className="form-check-input" id="inTheaters"
                  name="inTheaters" type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="inTheaters">In Theaters</label>
                 </div>
              </div>

              <div className="col-auto">
                <Button className="btn btn-primary" onClick={()=> formikProps.submitForm() }  >Filter</Button>
                <Button className="btn btn-danger ms-3" onClick={()=> formikProps.setValues(initialValues) } >Clear</Button>
              </div>





            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface FilterMoviesForm {
  title: string;
  genreId: number;
  upcomingRelease: boolean;
  inTheaters: boolean;
}
