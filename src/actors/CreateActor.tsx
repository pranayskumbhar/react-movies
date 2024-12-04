import { Link } from "react-router-dom";
import ActorForm from "./ActorForm";

export default function CreateActor() {
  return (
    <>
      <h3>Create Actor</h3>
      <ActorForm model={{ name: "", dateOfBirth: new Date() }}
        onSubmit={async values => {
          console.log(values)
          await new Promise((r) => setTimeout(r, 2000));
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
