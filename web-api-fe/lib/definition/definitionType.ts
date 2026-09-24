type SignFormType = {
  isActive: string;
  signclick: (value: string) => void;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

type LoginViewModel = {
  username: string;
  password: string;
};

export type { SignFormType, InputProps, LoginViewModel };
