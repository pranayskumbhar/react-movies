import { Link, useParams } from "react-router-dom";

export default function EditGenre() {

const {id}:any = useParams();

  return (
    <>
      <h3> Edit genre</h3>
      Id is {id}
    </>
  );
}
