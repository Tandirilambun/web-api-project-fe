import SignButtonGroup from "./components/SignButtonGroup";

export default function Login() {
  return (
    <>
      <div className="h-full flex items-center justify-items-center w-full bg-gray-200">
        <div className="grid grid-cols-2 mx-auto w-[160dvh] h-[80dvh]">
          <div className="bg-white w-full h-full py-5 px-44 flex flex-col rounded-l-xl">
            <SignButtonGroup />
            <div className="my-8">
              <h1 className="font-semibold text-center text-2xl ">Welcome!</h1>
              <h2 className="text-center text-md mt-2">
                Please enter your details to login.
              </h2>
            </div>
            <div className="inputGroupWrapper mb-5">
              <label htmlFor="username" className="text-[10pt]">
                Username or Email
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username or email"
                className="w-full bg-white p-2 border border-gray-300 rounded-[10px] text-[9pt]"
              />
            </div>

            <div className="inputGroupWrapper mb-5">
              <label htmlFor="password" className="text-[10pt]">
                Password
              </label>
              <input
                type="password"
                name="username"
                id="username"
                placeholder="Enter your password"
                className="w-full bg-white p-2 border border-gray-300 rounded-[10px] text-[9pt]"
              />
            </div>

            <button type="submit" 
              className="text-center w-full
              bg-linear-to-b from-gray-900 from-10% to-black to-80%
              text-sm py-[12px] rounded-xl text-white
              border-2 border-gray-900 font-bold text-[9pt]">
              Log In
            </button>

            <div className="flex items-center my-6">
              <div className="w-full bg-gray-300 h-[2px]"></div>
              <p className="mx-5 text-[9pt] text-gray-300">OR</p>
              <div className="w-full bg-gray-300 h-[2px]"></div>
            </div>

            <button type="submit" className="text-center w-full
              rounded-xl border py-[8px] text-[9pt] font-bold
            ">
              Continue with Google
            </button>

            <div className="mt-auto">
              <p className="text-center text-[9pt]">
                {`Don't have account yet?`} <a href="#" className="font-bold underline underline-offset-3">Sign up</a>
              </p>
            </div>
          </div>
          <div className="bg-red-400 h-full w-full rounded-r-xl">
            <p>test</p>
          </div>
        </div>
      </div>
    </>
  );
}
