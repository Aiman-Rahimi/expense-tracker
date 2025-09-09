import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Inputs.jsx";
import { validateEmail } from "../../utils/helper.js";
import { API_PATHS } from "../../utils/apiPath.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { UserContext } from "../../context/UserContext.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login Form
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    //Login API Call
    try {
      console.log("📤 Sending login request:", { email, password });

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      console.log("LOGIN RESPONSE:", response.data);
      const {token, user} = response.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      updateUser(user); // Update user info in context
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Login Error:", error.response || error.message);
    if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    } 
  };
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900">Welcome Back 👋</h3>
          <p className="text-sm text-gray-600 mt-2">
            Please enter your details to log in.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="abu123@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-700 mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
