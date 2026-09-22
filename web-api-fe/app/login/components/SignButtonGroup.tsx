"use client";
import { LogIn, UserPlus } from "@deemlol/next-icons";

type SignButtonGroupProps = {
  active: string;
  onChange: (value: string) => void;
};

export default function SignButtonGroup({active, onChange} : SignButtonGroupProps) {
  return (
      <div
        className="SignGroup grid grid-cols-2 gap-1 ml-auto p-[3px]
      bg-gray-200 rounded-[12px]"
      >
        <button
          type="button"
          className={`${active == "SignIn" ? "isActive" : ""}
            text-[9pt] font-bold rounded-[9px] py-[4px] text-gray-700
            px-2
            flex justify-center items-center `}
          onClick={() => onChange("SignIn")}
        >
          <LogIn size={13} color="#000000" strokeWidth={2.6} />
          <span className="pl-1.25">Sign In</span>
        </button>
        <button
          type="button"
          className={`${active == "SignUp" ? "isActive" : ""}
            text-[9pt] font-bold rounded-[9px] text-gray-700
            px-2
            flex justify-center items-center`}
          onClick={() => onChange("SignUp")}
        >
          <UserPlus size={13} color="#000000" strokeWidth={2.6} />
          <span className="pl-1.25">Sign Up</span>
        </button>
      </div>

  );
}
