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
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "1px solid gray",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
