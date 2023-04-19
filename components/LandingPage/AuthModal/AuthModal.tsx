import React from "react";
import SignupContent from "./SignupContent";
import SigninContent from "./SigninContent";

type Props = {
  handleAuthModal: (authType?: string) => void;
  isSignin: boolean;
  isSignup: boolean;
};

const AuthModal = ({ handleAuthModal, isSignin, isSignup }: Props) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
        <div className="bg-white p-6">
          {isSignin ? (
            <SigninContent handleAuthModal={handleAuthModal} />
          ) : (
            <SignupContent handleAuthModal={handleAuthModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
