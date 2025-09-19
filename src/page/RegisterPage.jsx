import React, { useState } from "react";
import { register } from "../services/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // (optional) quick client-side check
    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak password",
        text: "Password should be at least 6 characters.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setIsLoading(true);
    const userData = { name, email, password };

    try {
      const newUser = await register(userData);

      if (newUser?.error) {
        // server returned an error payload
        const msg =
          typeof newUser.error === "string"
            ? newUser.error
            : newUser.error?.message || "Something went wrong. Please try again.";
        await Swal.fire({
          title: "Registration Failed",
          text: msg,
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
        return;
      }

      // success
      setName("");
      setEmail("");
      setPassword("");

      await Swal.fire({
        title: "Account Created 🎉",
        text: "Your account has been created successfully. You can now sign in.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/"); // go to login
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: "Registration Error",
        text: error?.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join us and start your journey today</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                id="name" type="text" required placeholder="Enter your full name"
                value={name} onChange={(e) => setName(e.target.value)}
                className="appearance-none relative block w-full pl-6 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                id="email" type="email" required placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full pl-6 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                id="password" type="password" required placeholder="Create a secure password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full pl-6 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit" disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create Account
                  </div>
                )}
              </button>
            </div>

            {/* Divider + link */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                onClick={() => (window.location.href = "/")}
              >
                Sign in instead
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
