import { Link, useHistory } from "react-router-dom";
import Button from "../utils/Button";

export default function CreateGenre() {
  const history = useHistory();
  return (
    <>
      <h3>Create genre</h3>
      <Button onClick={() => {
        //saving data to db
        history.push("/genres");
      }}>Save Genre</Button>
    </>
  );
}
