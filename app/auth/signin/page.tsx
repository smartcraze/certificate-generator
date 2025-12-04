"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <button
        onClick={handleGoogle}
        className="mx-2 px-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
