import { Link, useHistory } from "react-router-dom";
import ActorForm from "./ActorForm";
import actorCreationDTO from "./actors.model";
import { GetAxiosError } from "../Repo/ConvertToAxiosError";
import { useState } from "react";
import DisplayError from "../utils/DisplayError";
import { ConvertActorToFormData } from "../utils/FormDataUtils";
import axios from "axios";
import { urlActors } from "../endpoints";

export default function CreateActor() {
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  async function Create(actor: actorCreationDTO) {
    try {
      const formdata = ConvertActorToFormData(actor);

      // await axios.post({
      //   method: "post",
      //   url: urlActors,
      //   data: formdata,
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      await axios.post(urlActors, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push("/actors");
    } catch (axerror) {
      let error = GetAxiosError(axerror);
      if (error && error.response) {
        setErrors(error.response.data as string[]);
      }
    }
  }

  return (
    <>
      <h3>Create Actor</h3>
      <DisplayError errors={errors} />
      <ActorForm
        model={{ name: "", dateOfBirth: new Date() }}
        onSubmit={async (values) => {
          console.log("+++++++++++++" + values);
          await Create(values);
        }}
      />
    </>
  );
}

// import { Link } from "react-router-dom";
// import ActorForm from "./ActorForm";

// export default function CreateActor() {
//   return (
//     <>
//       <h3>Create Actor</h3>
//       <ActorForm model={{name:"", dateOfBirth:undefined}}
//       onSubmit={async values=>{
//         console.log(values)
//         await new Promise((r) => setTimeout(r, 2000));
//       }}
//       />
//     </>
//   );
// }
