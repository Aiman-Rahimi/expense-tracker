import React from "react";
import AuthIllustration from "../../assets/images/undraw_financial-data_lbci.svg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Left Illustration Section */}
      <div className="hidden md:flex w-[40vw] h-full items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 relative">
        <div className="text-center px-6">
          <img
            src={AuthIllustration}
            alt="Finance Illustration"
            className="w-3/4 mx-auto"
          />
          <h1 className="mt-6 text-white text-3xl font-bold tracking-wide drop-shadow">
            Expense Tracker
          </h1>
          <p className="mt-2 text-indigo-100 text-sm">
            Track your expenses with clarity and ease
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col w-full md:w-[60vw] px-8 md:px-16 py-12 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Welcome Back</h2>
        <div className="flex-1 flex items-center justify-center">{children}</div>
        <p className="mt-8 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
