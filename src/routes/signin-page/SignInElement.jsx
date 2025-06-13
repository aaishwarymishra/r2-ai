import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInElement = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInElement;
