export interface SignUpInfo {
  email: string;
  name?: string;
  password: string;
}

export interface SignUpInfoWithConfirm extends SignUpInfo {
  confirmPassword: string;
}

export interface SignUpInfoWithVerificationCode extends SignUpInfo {
  verificationCode: number;
}

export interface SignInInfo {
  email: string;
  password: string;
}
