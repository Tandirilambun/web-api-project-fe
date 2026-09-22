"use client";
import { SignFormType } from "@/lib/definitionType";
import InputGroup from "./InputGroup";
import Label from "@/components/Label";
import Input from "@/components/Input";
import InputPassword from "@/components/InputPassword";
import Button from "@/components/Button";

// {isActive, signclick} : SignFormType
export default function SignUpForm({ isActive, signclick }: SignFormType) {
  return (
    <div
      id="SignUpForm"
      className={`SignForm ${isActive == "SignUp" ? "active" : "inactive"} px-28 mt-24`}
    >
      <div>
        <h1 className="text-4xl">Get in touch</h1>
        <p className="text-xs my-[28px]">
          Hotels & apartments. No hidden fees, no clutter — just book and go.
        </p>
      </div>
      <InputGroup
        wrapperClass="mb-5"
        label={<Label htmlFor="name">Full Name</Label>}
        input={
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="w-full bg-white p-2 border-2 mt-0.5 border-gray-300 rounded-[10px] text-[9pt]"
          />
        }
      />
      <InputGroup
        wrapperClass="mb-5"
        label={<Label htmlFor="username">Username</Label>}
        input={
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="w-full bg-white p-2 border-2 mt-0.5 border-gray-300 rounded-[10px] text-[9pt]"
          />
        }
      />
      <div className="grid grid-cols-2 gap-[16px]">
        <InputGroup
        wrapperClass="mb-5"
          label={<Label htmlFor="email">Email</Label>}
          input={
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full bg-white p-2 border-2 mt-0.5 border-gray-300 rounded-[10px] text-[9pt]"
            />
          }
        />
        <InputGroup
        wrapperClass="mb-5"
          label={<Label htmlFor="password">Password</Label>}
          input={
            <InputPassword
              name="password"
              id="password"
              placeholder="Password"
            />
          }
        />
      </div>
      <div className="mb-6">
        <input type="checkbox" id="termsncondition" className="size-[12px]" />
        <label htmlFor="termsncondition" className="text-xs ml-2">
          By registering you agree with our
          <a href="#"> Terms & Condition</a>
        </label>
      </div>
      <Button
        type="submit"
        className="text-center w-full rounded-xl border py-[8px] text-[9pt] font-bold 
        bg-linear-to-b from-gray-900 from-10% to-black to-80% text-sm py-[12px] text-whiteborder-2 border-gray-900 text-white"
      >
        Sign Up
      </Button>
      <div className="mt-3">
        <p className="text-center text-[9pt]">
          {`Already have account?`}{" "}
          <a
            href="#"
            className="font-bold underline underline-offset-3"
            onClick={() => signclick("SignIn")}
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
