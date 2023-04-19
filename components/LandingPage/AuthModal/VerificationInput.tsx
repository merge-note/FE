import React, { useRef, ChangeEvent } from "react";
import { useAtom, useAtomValue } from "jotai";
import { inputVerificationCodeAtom } from "@/atoms/userAtoms";
import { signUp } from "@/apis/User";
import { SignUpInfo } from "@/interfaces/user";

interface VerificationInputProps {
  userInfo: SignUpInfo;
  setShowVerification: (show: boolean) => void;
  handleAuthModal: () => void;
}

const VerificationInput = ({
  userInfo,
  setShowVerification,
  handleAuthModal,
}: VerificationInputProps) => {
  const [inputVerification, setInputVerification] = useAtom(
    inputVerificationCodeAtom
  );

  const { email } = userInfo;

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement>,
    nextInput: React.RefObject<HTMLInputElement> | null,
    prevInput: React.RefObject<HTMLInputElement> | null
  ) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      e.target.value = value.slice(0, -1);
      return;
    }

    if (value.length === 1 && nextInput && nextInput.current) {
      nextInput.current.focus();
    } else if (value.length === 0 && prevInput && prevInput.current) {
      prevInput.current.focus();
    }

    const inputValues = [
      inputRef1.current?.value,
      inputRef2.current?.value,
      inputRef3.current?.value,
      inputRef4.current?.value,
    ];

    setInputVerification(Number(inputValues.join("")));
  };

  const signUpMutation = signUp();

  const handleVerification = () => {
    if (inputVerification) {
      const userInfoWithVerificationCode = {
        ...userInfo,
        verificationCode: inputVerification,
      };
      signUpMutation.mutate(userInfoWithVerificationCode);
      setShowVerification(false);
      handleAuthModal();
    } else {
      alert("Invalid verification code");
    }
  };

  return (
    <div>
      <p className="leading-tight mb-4 text-center">
        We&apos;ve sent a code to
        <br /> <span className="font-bold">{email}</span>
      </p>
      <div className="flex justify-between">
        <input
          ref={inputRef1}
          type="text"
          maxLength={1}
          pattern="\d"
          className="w-12 h-12 px-3 py-2 border border-gray-300 text-center text-lg"
          onChange={(e) => handleInput(e, inputRef2, null)}
        />
        <input
          ref={inputRef2}
          type="text"
          maxLength={1}
          pattern="\d"
          className="w-12 h-12 px-3 py-2 border border-gray-300 text-center text-lg"
          onChange={(e) => handleInput(e, inputRef3, inputRef1)}
        />
        <input
          ref={inputRef3}
          type="text"
          maxLength={1}
          pattern="\d"
          className="w-12 h-12 px-3 py-2 border border-gray-300 text-center text-lg"
          onChange={(e) => handleInput(e, inputRef4, inputRef2)}
        />
        <input
          ref={inputRef4}
          type="text"
          maxLength={1}
          pattern="\d"
          className="w-12 h-12 px-3 py-2 border border-gray-300 text-center text-lg"
          onChange={(e) => handleInput(e, null, inputRef3)}
        />
      </div>
      <button
        className="w-full bg-gray-900 hover:bg-[#fece2f] text-white font-bold py-2 px-4 mt-4 focus:outline-none focus:shadow-outline"
        onClick={handleVerification}
      >
        Verify
      </button>
    </div>
  );
};

export default VerificationInput;
