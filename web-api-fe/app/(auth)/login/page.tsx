"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignInForm from "../../../features/authentication/components/SignInForm";
import SignButtonGroup from "@/features/authentication/components/SignButtonGroup";
import SignUpForm from "../../../features/authentication/components/SignUpForm";
import Alert from "@/shared/components/alert";
import { useAlertStore, selectAlertState } from "@/shared/store/alert.store";
import { useAuthStore, selectAuthStatus } from "@/features/authentication/store/auth.store";

export default function Login() {
  const [signActive, setSignActive] = useState("SignIn");
  const status = useAlertStore(selectAlertState);
  const router = useRouter();
  const authStatus = useAuthStore(selectAuthStatus);

  // Jika user sudah login, redirect ke dashboard
  useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [authStatus, router]);

  const toggleAlert = () => {
    useAlertStore.getState().setIsOpen(!status);
    useAlertStore.setState((state) => ({ ...state, status: "warning", message: "This is a warning alert! from page.tsx" }));
  };

  return (
    <>
      <div className=" flex items-center justify-items-center size-full bg-gray-200 text-gray-700">
        <div className="lg:grid lg:grid-cols-2 mx-auto w-[1100px] h-[80dvh]">
          <div className="bg-white p-[12px] rounded-l-[32px] flex flex-col">
            <SignButtonGroup active={signActive} />
            {signActive === "SignIn" ? (
              <SignInForm isActive={signActive} signclick={setSignActive} />
            ) : (
              <SignUpForm isActive={signActive} signclick={setSignActive} />
            )}
          </div>
          <div className="bg-white rounded-r-[32px] p-[12px] lg:block md:hidden">
            <div className="bg-[url('/img/test.jpg')] bg-cover bg-center bg-no-repeat size-full rounded-[20px]"></div>
          </div>
        </div>
      </div>
    </>
  );
}