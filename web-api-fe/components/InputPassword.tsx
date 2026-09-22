"use client";
import { useState } from "react";
import { Eye, EyeOff } from "@deemlol/next-icons";
export default function InputPassword({
  id,
  name,
  placeholder,
}: {
  id: string;
  name: string;
  placeholder: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full mt-0.5">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        id={id}
        placeholder="Enter your password"
        className="w-full bg-white p-2 pr-10 border-2
                 border-gray-300 rounded-[10px] text-[9pt]"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff color="#000" size={16} />
        ) : (
          <Eye color="#000" size={16} />
        )}
      </button>
    </div>
  );
}
