import { Link } from "react-router-dom";
import ActorForm from "./ActorForm";

export default function EditActor() {
  return (
    <>
      <h3> Edit Actor</h3>
      <ActorForm
        model={
          { name: "Pranay", 
            dateOfBirth: new Date("1998-02-11"), 
            pictureURL:"https://t3.ftcdn.net/jpg/07/16/46/44/360_F_716464441_DvxUkPchxMPozb2zAFof1DHEze2dxKHG.jpg" ,
            biography :`# Something 
            This person is **Great**            `
          }
        }
        onSubmit={async (values) => {
          console.log(values);
        }}
      />
    </>
  );
}
