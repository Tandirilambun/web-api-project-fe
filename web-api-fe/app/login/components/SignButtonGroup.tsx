"use client";
import { useState } from "react";

export default function SignButtonGroup() {
  const [isActive, setIsActive] = useState("SignIn");
  return (
    <>
      <div className="SignGroup grid grid-cols-2 mx-24 mt-20 p-[3px]
      bg-gray-300 rounded-[12px]">
        <button
          type="button"
          className={`${isActive == "SignIn" ? "isActive" : null}
            text-[9pt] font-bold rounded-[9px] py-[4px] text-gray-700`}
          onClick={() => setIsActive("SignIn")}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`${isActive == "SignUp" ? "isActive" : null}
            text-[9pt] font-bold rounded-[9px] text-gray-700`}
          onClick={() => setIsActive("SignUp")}
        >
          Sign Up
        </button>
      </div>
    </>
  );
}
