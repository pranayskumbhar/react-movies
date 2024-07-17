import React, { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericList(props: genericListProps) {
  if (!props.list) {
    if (props.loaddingUI) {
      return props.loaddingUI;
    }
    return <Loading />;
  } else if (props.list.length === 0) {
    if (props.emptyListUI) {
      return props.emptyListUI;
    }
    return <>There are nothing to display..</>;
  } else {
    return props.children;
  }
}


//ALTERNATE WE CAN WRITE IS
// export default function GenericList(props: genericListProps) {
//   if (!props.list) {
    
//     return <Loading />;
//   } else {
//     return props.children;

//   }
   
// }


interface genericListProps {
  list: any;
  loaddingUI?: ReactElement;
  emptyListUI?: ReactElement;
  children: ReactElement;
}
