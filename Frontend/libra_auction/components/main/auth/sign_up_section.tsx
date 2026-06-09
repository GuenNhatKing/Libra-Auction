"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "./passwordInput";
import { signUp } from "@/lib/sign_up";

export default function SignUpSection() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const onSuccess = (token: string) => {
      setVerificationToken(token);
      setCheckEmail(true);
    };
    const onFailed = (message: string) => {
      setErrorMessage(message);
    };
    await signUp(
      fullName,
      username,
      email,
      password,
      confirmPassword,
      onSuccess,
      onFailed,
    );
  };

  if (checkEmail) {
    return (
      <div className="flex flex-col mt-6 gap-4 items-center text-center">
        <div className="text-5xl mb-2">&#9993;</div>
        <p className="text-xl font-bold">Kiểm tra email của bạn</p>
        <p className="text-gray-600">
          Chúng tôi đã gửi mã OTP đến <strong>{email}</strong>.
          Vui lòng đăng nhập và vào mục xác thực email trong trang hồ sơ để hoàn tất.
        </p>
        <button
          onClick={() => router.push("/sign-in")}
          className="mt-4 px-6 py-2 bg-(--primary-color) text-white rounded-full font-semibold hover:bg-(--primary-color)/90 transition-colors"
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSignUp}>
      <div className="flex flex-col mt-6 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e: FormEvent) => {
            const inputElement = e.target as HTMLInputElement;
            setFullName(inputElement.value);
          }}
          className="bg-white border rounded-sm px-4 py-4 focus:outline-(--primary-color)"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: FormEvent) => {
            const inputElement = e.target as HTMLInputElement;
            setUsername(inputElement.value);
          }}
          className="bg-white border rounded-sm px-4 py-4 focus:outline-(--primary-color)"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e: FormEvent) => {
            const inputElement = e.target as HTMLInputElement;
            setEmail(inputElement.value);
          }}
          className="bg-white border rounded-sm px-4 py-4 focus:outline-(--primary-color)"
        />{" "}
        <PasswordInput
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e: FormEvent) => {
            const inputElement = e.target as HTMLInputElement;
            setPassword(inputElement.value);
          }}
        />
        <PasswordInput
          name="confirm-password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e: FormEvent) => {
            const inputElement = e.target as HTMLInputElement;
            setConfirmPassword(inputElement.value);
          }}
        />
        {errorMessage && <div className="text-red-700">{errorMessage}</div>}
        <input
          type="submit"
          value="Sign up"
          className="bg-(--primary-color) text-white font-bold text-lg rounded-full p-3 cursor-pointer hover:bg-(--primary-color)/90 active:bg-(--primary-color)/80"
        />
      </div>
    </form>
  );
}
