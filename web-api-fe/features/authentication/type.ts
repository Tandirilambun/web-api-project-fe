type SignFormType = {
  isActive: string;
  signclick: (value: string) => void;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

type LoginPayload = {
  username: string;
  password: string;
};

type UserData = {
  id: string;
  username: string;
  name: string;
  phone_number: string;
  slug: string;
  roles: string[];
};

type LoginResponseData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  user?: UserData;
};

type LoginResponse = {
  message: string;
  data: LoginResponseData;
};

type RegisterPayload = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string ;
  termsncondition: boolean;
};

export type { SignFormType, InputProps, LoginPayload, UserData, LoginResponse, RegisterPayload };
