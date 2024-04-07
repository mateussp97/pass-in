import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<"button"> {
  children: string;
}

export function NavLink(props: NavLinkProps) {
  return (
    <button {...props} className="font-medium text-sm text-zinc-300">
      {props.children}
    </button>
  );
}
