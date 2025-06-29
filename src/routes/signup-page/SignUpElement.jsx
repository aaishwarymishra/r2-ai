import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpElement = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignUpElement;
