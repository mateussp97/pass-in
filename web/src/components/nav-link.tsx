import { ComponentProps, ReactNode } from "react";

interface NavLinkProps extends ComponentProps<"button"> {
  children: ReactNode;
}

export function NavLink(props: NavLinkProps) {
  return (
    <button
      {...props}
      className="px-3 py-2 text-sm font-semibold text-zinc-300 relative flex items-center justify-center"
    >
      {props.children}
    </button>
  );
}
