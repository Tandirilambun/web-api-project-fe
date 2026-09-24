import { LoginViewModel } from "./definition/definitionType";

async function loginUser(data: LoginViewModel) {
  const portfwd :string = "https://3q85r2bb-5113.usw3.devtunnels.ms/";
  const localport :string = "http://localhost:5113/";
  const res = await fetch(`${portfwd}api/account/login-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message ?? "Login Faild. Please try again.");
  }

  return result;
}

export { loginUser };
