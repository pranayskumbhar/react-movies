import { ReactElement, ReactNode } from "react";

export default function Button(props: buttonProps) {
  return <button type={props.type} className="btn btn-primary"
  onClick={props.onClick}
  >{props.children}</button>
}

interface buttonProps {
  children: ReactNode;
  onClick?() : void;
  type : "button" | "submit";
 }


Button.defaultProps = {
  type : "button"
}