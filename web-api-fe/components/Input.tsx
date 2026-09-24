import { forwardRef } from "react";
import { InputProps } from "@/lib/definition/definitionType";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...prop }, ref) => {
    return (
    <>
      <input
        ref={ref}
        className={`${className} ${error ? "border-red-400" : ""}`}
        {...prop}
      />
    </>
  )}
);

Input.displayName = "Input";
export default Input;
