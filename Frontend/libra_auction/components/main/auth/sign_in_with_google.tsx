"use client";
import GoogleLogo from "@/public/google_logo.svg";
import Image from "next/image";
import { signInGoogle } from "@/lib/sign_in";
export default function GoogleSignInButton() {
  const handleGoogleSignIn = () => {
    const onSuccess = () => {
      window.location.replace("/");
    };
    const onFailed = () => {
    };
    signInGoogle(onSuccess, onFailed);
  };
  return (
    <button
      className="bg-white border border-[#747775] rounded-full cursor-pointer p-3 w-full hover:bg-gray-100 active:bg-gray-200"
      onClick={handleGoogleSignIn}
    >
      <div className="flex items-center justify-center">
        <Image src={GoogleLogo} alt="" className="h-6" />
        <p className="font-medium text-lg">
          Sign in with Google
        </p>
      </div>
    </button>
  );
}
