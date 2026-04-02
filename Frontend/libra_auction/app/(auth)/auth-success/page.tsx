"use client";
import { useEffect, useRef, useState } from "react";
import mark from "@/public/mark.png";
import Image from "next/image";

function AuthSuccess() {
  const timeout = 3;
  const [seconds, setSeconds] = useState(timeout);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const handleCloseNow = () => {
    if (window.opener) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.close();
    }
  };

  useEffect(() => {
    const handleUnload = () => {
      if (window.opener) {
        window.opener.postMessage({ type: "AUTH_SUCCESS" });
      }
    };

    window.addEventListener("unload", handleUnload);
    if (window.opener) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            window.opener.postMessage({ type: "AUTH_SUCCESS" });
            window.close();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        window.removeEventListener("unload", handleUnload);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Image src={mark} alt="" width={240} height={240} />
          <div className="text-center mt-8 mb-5 text-green-600 text-4xl font-bold">
            SUCCESS
          </div>
          <div className="text-2xl">
            The window will close in {seconds} seconds
          </div>
        </div>
      </div>

      <button
        className="h-[12.5%] w-full text-3xl uppercase font-bold text-white cursor-pointer bg-green-600 hover:bg-green-700 active:bg-green-800"
        onClick={handleCloseNow}
      >
        Close now
      </button>
    </div>
  );
}

export default function page() {
  return <AuthSuccess />;
}
