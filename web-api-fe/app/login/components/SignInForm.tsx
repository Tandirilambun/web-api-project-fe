import Label from "@/components/Label";
import Input from "@/components/Input";
import InputGroup from "@/app/login/components/InputGroup";
import InputPassword from "@/components/InputPassword";
import Button from "@/components/Button";
import { SignFormType } from "@/lib/definitionType";
import { Google } from "@deemlol/next-icons";

export default function SignInForm({ isActive, signclick }: SignFormType) {
  return (
    <div
      id="SignInForm"
      className={`SignForm ${isActive == "SignIn" ? "active" : "inactive"} h-full px-48 mt-24`}
    >
      <div className="flex flex-col h-full">
        <div className="">
          <h1 className="text-center text-4xl">Welcome!</h1>
          <p className="text-center text-xs my-[28px]">
            Please enter your details to login.
          </p>
        </div>
        <InputGroup
          wrapperClass="mb-5"
          label={<Label htmlFor="username">Username or Email</Label>}
          input={
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username or email"
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
              placeholder="Enter your Password"
            />
          }
        />
        <Button
          type="submit"
          className="text-center w-full mt-4 bg-linear-to-b 
          from-gray-900 from-10% to-black to-80% text-sm py-[12px] 
          rounded-xl text-whiteborder-2 border-gray-900 font-bold text-[9pt] 
          text-white hover:scale-[1.03] hover:ease-in-out duration-150"
        >
          Log In
        </Button>

        <div className="flex items-center my-6">
          <div className="w-full bg-gray-300 h-[2px]"></div>
          <p className="mx-5 text-[9pt] text-gray-300">OR</p>
          <div className="w-full bg-gray-300 h-[2px]"></div>
        </div>

        <Button
          type="submit"
          className="text-center w-full rounded-xl border-2 border-gray-300 py-[8px] text-[9pt] font-bold flex items-center justify-center"
        >
          <Google size={14} color="#000000" strokeWidth={1.1} />
          <span className="pl-1">Continue with Google</span>
        </Button>

        <div className="mt-auto">
          <p className="text-center text-[9pt]">
            {`Don't have account yet?`}{" "}
            <a
              href="#"
              className="font-bold underline underline-offset-3"
              onClick={() => signclick("SignUp")}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
