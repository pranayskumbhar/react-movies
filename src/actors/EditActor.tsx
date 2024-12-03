import { Link } from "react-router-dom";
import ActorForm from "./ActorForm";

export default function EditActor() {
  return (
    <>
      <h3> Edit Actor</h3>
      <ActorForm
        model={{ name: "Pranay", dateOfBirth: new Date("1998-02-11") }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      />
    </>
  );
}
