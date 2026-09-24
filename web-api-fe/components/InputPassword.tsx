"use client";
import { useState } from "react";
import { Eye, EyeOff } from "@deemlol/next-icons";
import { forwardRef } from "react";
import Input from "./Input";
import Button from "./Button";
import { InputProps } from "@/lib/definition/definitionType";



const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...prop }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const showPasswordHandle = () => setShowPassword((prev) => !prev);
    return (
      <div className="relative w-full mt-0.5">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className={`w-full bg-white p-2 pr-10 border-2 border-gray-300 rounded-[10px] text-[9pt]
          ${error ? "border-red-400" : ""}`}
          {...prop}
        />
        <Button
          id="showPassword"
          type="button"
          onClick={showPasswordHandle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff strokeWidth={2} color={error ? "#f87171" : "#94A3B8"} size={16} />
          ) : (
            <Eye strokeWidth={2} color={error ? "#f87171" : "#94A3B8"} size={16} />
          )}
        </Button>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";
export default InputPassword;
