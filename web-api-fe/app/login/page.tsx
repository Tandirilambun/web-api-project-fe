"use client";

import { useState } from "react";
import SignInForm from "./components/SignInForm";
import SignButtonGroup from "@/app/login/components/SignButtonGroup";
import SignUpForm from "./components/SignUpForm";

export default function Login() {
  const [signActive, setSignActive] = useState("SignIn");

  return (
    <>
      <div className=" flex items-center justify-items-center size-full bg-gray-200 text-gray-700">
        <div className="grid grid-cols-2 mx-auto w-[160dvh] h-[80dvh]">
          <div className="bg-white p-[20px] rounded-l-[32px] flex flex-col">
            <SignButtonGroup active={signActive}/>
            <SignUpForm isActive={signActive} signclick={setSignActive}/>
            <SignInForm isActive={signActive} signclick={setSignActive}></SignInForm>
          </div>
          <div className="bg-white rounded-r-[32px] p-[12px]">
            <div className="bg-[url('/img/test.jpg')] bg-cover bg-center bg-no-repeat size-full rounded-[20px]">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
