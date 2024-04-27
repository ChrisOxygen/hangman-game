import { type ComponentPropsWithoutRef } from "react";
import { Link, LinkProps } from "react-router-dom";

type ButtonProps = {
  el: "button";
  onClick: () => void;
} & ComponentPropsWithoutRef<"button">;

type AnchorProps = {
  el: "anchor";
} & LinkProps;

export default function Button(props: ButtonProps | AnchorProps) {
  if (props.el === "anchor") {
    return <Link {...props}></Link>;
  }

  return <button {...props}></button>;
}
