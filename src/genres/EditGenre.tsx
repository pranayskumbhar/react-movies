import { Link, useParams } from "react-router-dom";
import GenreForm from "./GenreForm";

export default function EditGenre() {
  const { id }: any = useParams();

  return (
    <>
      <h3> Edit genre</h3>
      Id is {id}{" "}
      <GenreForm
        model={{ name: "" }}
        onSubmit={async value => {
          //when the form is posted
          await new Promise((r) => setTimeout(r, 1));
          console.log(value);
          console.log(id);
          
        }}
      />
    </>
  );
}
