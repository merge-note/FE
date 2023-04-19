import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "./authSchema";
import { signIn, googleOAuth } from "@/apis/User";
import { SignInInfo } from "@/interfaces/user";
import SignInForm from "./SigninForm";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface Props {
  handleAuthModal: (authType?: string) => void;
}

const SigninContent = ({ handleAuthModal }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInfo>({
    resolver: yupResolver(signinSchema),
  });

  const signInMutation = signIn();
  const googleOAuthMutation = googleOAuth();

  const handleSignin = async (data: SignInInfo) => {
    try {
      await signInMutation.mutateAsync(data);
      handleAuthModal();
      router.push("/search");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl =
      "https://accounts.google.com/o/oauth2/auth?" +
      `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENTID}&` +
      `redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT}&` +
      "response_type=token&" +
      "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

    const popup = window.open(googleAuthUrl, "_blank", "width=500,height=500");

    if (!popup) {
      alert("Please disable your popup blocker and try again.");
      return;
    }

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        return;
      }

      try {
        const parsedHash = new URLSearchParams(
          popup.location.hash.substring(1)
        );
        const accessToken = parsedHash.get("access_token");
        if (accessToken) {
          clearInterval(timer);
          popup.close();
          googleOAuthMutation.mutateAsync(accessToken);
          handleAuthModal();
          router.push("/search");
        }
      } catch (error) {}
    }, 100);
  };

  return (
    <div className="w-72 relative">
      <CloseRoundedIcon
        className="absolute -right-3 -top-2 cursor-pointer"
        onClick={() => {
          handleAuthModal();
        }}
      />
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign in</h2>
      </div>
      <SignInForm
        handleSubmit={handleSubmit}
        handleSignin={handleSignin}
        handleGoogleLogin={handleGoogleLogin}
        register={register}
        errors={errors}
      />
      <div className="mt-4 text-sm text-center">
        <span>
          Don&apos;t have an account yet?
          <button
            className="font-bold underline cursor-pointer ml-1"
            onClick={() => {
              handleAuthModal("Signup");
            }}
          >
            Signup
          </button>
        </span>
      </div>
    </div>
  );
};

export default SigninContent;
