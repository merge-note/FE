import React from "react";
import FormInput from "./FormInput";

interface Props {
  handleSubmit: any;
  handleSignin: any;
  handleGoogleLogin: () => void;
  register: any;
  errors: any;
}

const SignInForm = ({
  handleSubmit,
  handleSignin,
  handleGoogleLogin,
  register,
  errors,
}: Props) => (
  <form onSubmit={handleSubmit(handleSignin)}>
    <FormInput
      label="Email"
      type="email"
      name="email"
      register={register}
      errors={errors}
      placeholder="Email address"
    />
    <FormInput
      label="Password"
      type="password"
      name="password"
      register={register}
      errors={errors}
      placeholder="********"
    />
    <div className="flex flex-col mt-6">
      <button
        className="w-full h-10 bg-gray-900 hover:bg-[#fece2f] text-white font-bold py-2 px-4"
        type="submit"
      >
        Submit
      </button>
      <div>
        <button
          className="w-full h-10 px-4 border-2 hover:bg-gray-900 hover:text-white hover:border-0 mt-2 font-bold flex justify-center items-center"
          type="button"
          onClick={handleGoogleLogin}
        >
          <img src="/images/Google.png" alt="Google" className="h-5 w-5 mr-4" />
          Sign in with Google
        </button>
      </div>
    </div>
  </form>
);

export default SignInForm;
