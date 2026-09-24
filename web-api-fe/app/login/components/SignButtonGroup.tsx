"use client";
import { LogIn, UserPlus } from "@deemlol/next-icons";

export default function SignButtonGroup({ active }: { active: string }) {
  return (
    <div
      className="SignGroup relative grid grid-cols-2 gap-1 ml-auto p-[3px]
      bg-gray-200 rounded-[12px] cursor-default"
    >
      <span
        className={`sign-slider ${active === "SignUp" ? "active-right" : "active-left"}`}
      />

      <div
        className={`${active == "SignIn" ? "isActive" : ""}
            sign-tab text-[9pt] font-bold rounded-[9px] py-[4px] text-gray-700
            px-2
            flex justify-center items-center relative z-10`}
      >
        <LogIn size={13} color="#000000" strokeWidth={2.6} />
        <span className="pl-1.25">Sign In</span>
      </div>
      <div
        className={`${active == "SignUp" ? "isActive" : ""}
            sign-tab text-[9pt] font-bold rounded-[9px] text-gray-700
            px-2
            flex justify-center items-center relative z-10`}
      >
        <UserPlus size={13} color="#000000" strokeWidth={2.6} />
        <span className="pl-1.25">Sign Up</span>
      </div>
    </div>
  );
}
