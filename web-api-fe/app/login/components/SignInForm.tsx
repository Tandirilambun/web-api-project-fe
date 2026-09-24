import Label from "@/components/Label";
import Input from "@/components/Input";
import InputGroup from "@/app/login/components/InputGroup";
import InputPassword from "@/components/InputPassword";
import Button from "@/components/Button";
import { SignFormType } from "@/lib/definition/definitionType";
import { Google } from "@deemlol/next-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "@/lib/AuthService";
import { LoginViewModel } from "@/lib/definition/definitionType";

export default function SignInForm({ isActive, signclick }: SignFormType) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<LoginViewModel>();

  const LoginSubmit: SubmitHandler<LoginViewModel> = async (data) => {
    try {
      const res = await loginUser(data);
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  const SignHandle = () => {
    reset({ username: "", password: "" });
    clearErrors();
    signclick("SignUp");
  };

  return (
    <div
      id="SignInForm"
      className={`SignForm ${isActive == "SignIn" ? "active" : "inactive"} h-full px-48 mt-24`}
    >
      <div className="flex flex-col h-full">
        <div className="form-fade-up" style={{ animationDelay: "0ms" }}>
          <h1 className="text-center text-4xl font-semibold">Welcome!</h1>
          <p className="text-center text-xs my-[28px]">
            Please enter your details to login.
          </p>
        </div>
        <form onSubmit={handleSubmit(LoginSubmit)} id="SignInForm">
          <div className="form-fade-up" style={{ animationDelay: "100ms" }}>
            <InputGroup
              wrapperClass="mb-5"
              label={<Label htmlFor="username">Username or Email</Label>}
              input={
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter your username or email"
                  className={`w-full bg-white p-2 border-2 mt-0.5 border-gray-300 rounded-[10px] text-[9pt]`}
                  error={!!errors.username || !!errors.root}
                  {...register("username", {
                    required:
                      "Username is required you degenerate piece of shit",
                  })}
                />
              }
              errors={
                errors.root?.message ||
                (errors.username && errors.username.message)
              }
            />
          </div>

          <div className="form-fade-up" style={{ animationDelay: "200ms" }}>
            <InputGroup
              wrapperClass="mb-2"
              label={<Label htmlFor="password">Password</Label>}
              input={
                <InputPassword
                  {...register("password", {
                    required:
                      "Password is required you idiot! How can you login without password dumb!",
                  })}
                  id="password"
                  error={!!errors.password || !!errors.root}
                />
              }
              errors={
                errors.root?.message ||
                (errors.password && errors.password.message)
              }
            />
            <div className="w-full flex justify-end">
              <span className="font-semibold text-xs text-end cursor-pointer hover:underline hover:underline-offset-3">
                Forget Password?
              </span>
            </div>
          </div>

          <div className="form-fade-up" style={{ animationDelay: "300ms" }}>
            <Button
              type="submit"
              className="text-center w-full mt-6 bg-linear-to-b 
            from-gray-900 from-10% to-black to-80% text-sm py-[12px] 
            rounded-xl text-whiteborder-2 border-gray-900 font-bold text-[9pt] 
            text-white hover:scale-[1.03] hover:ease-in-out duration-150"
            >
              Log In
            </Button>
          </div>

          <div
            className="form-fade-up flex items-center my-6"
            style={{ animationDelay: "400ms" }}
          >
            <div className="w-full bg-gray-300 h-[2px]"></div>
            <p className="mx-5 text-[9pt] text-gray-300">OR</p>
            <div className="w-full bg-gray-300 h-[2px]"></div>
          </div>

          <div className="form-fade-up" style={{ animationDelay: "500ms" }}>
            <Button
              type="submit"
              className="text-center w-full rounded-xl border-2 border-gray-300 py-[8px] text-[9pt] font-bold flex items-center justify-center"
            >
              <Google size={14} color="#000000" strokeWidth={1.1} />
              <span className="pl-1">Continue with Google</span>
            </Button>
          </div>
        </form>

        <div
          className="form-fade-up mt-auto"
          style={{ animationDelay: "600ms" }}
        >
          <p className="text-center text-[9pt]">
            {`Don't have account yet?`}{" "}
            <a
              href="#"
              className="font-bold underline underline-offset-3"
              onClick={(event) => {
                event.preventDefault();
                SignHandle();
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
