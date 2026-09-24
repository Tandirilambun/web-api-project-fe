import React from "react";

type ButtonAttributesProp = React.HTMLAttributes<HTMLButtonElement> & {
  type: "submit" | "reset" | "button";
  children: React.ReactNode;
  className: string;
};

export default function Button({
  type,
  children,
  className,
  ...prop
}: ButtonAttributesProp) {
  return (
    <>
      <button type={type} className={className} {...prop}>
        {children}
      </button>
    </>
  );
}
