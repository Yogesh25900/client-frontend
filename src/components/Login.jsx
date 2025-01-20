import React, { useState } from "react";
import './Dashboard.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-sm mt-6 text-gray-800">
              Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.
            </p>
            <p className="text-sm mt-12 text-gray-800">
              Don't have an account
              <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Register here</a>
            </p>
          </div>

          <form className="max-w-md md:ml-auto w-full">
            <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Sign in</h3>
            <div className="space-y-4">
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  placeholder=""
                />
                <label htmlFor="email" className="input-label">
                  Email address
                </label>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                  autoComplete="current-password"
                  required
                  className="input-field"
                  placeholder=""
                />
                <label htmlFor="password" className="input-label">Password</label>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle absolute inset-y-0 right-3 flex items-center text-gray-500"
                  aria-label="Toggle Password Visibility"
                >
                    <div className="relative w-5 h-5">

                  {showPassword ? (
                   <svg
                   id="show-icon"

                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                   strokeWidth="2"
                 >
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                   />
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M2.458 12C3.732 7.943 7.522 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                   />
                 </svg>
                 
                  ) : (
                    <svg
  xmlns="http://www.w3.org/2000/svg"
  id="hide-icon"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth="2"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3.98 8.223A10.97 10.97 0 012 12c1.274 4.057 5.064 7 9.542 7 2.41 0 4.63-.806 6.423-2.144M6.172 6.172A10.968 10.968 0 0112 5c4.477 0 8.268 2.943 9.542 7-.318 1.015-.802 1.962-1.414 2.804M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4 4l16 16"
  />
</svg>

                  )}
                  </div>
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 hover:text-blue-500 font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>
            <div className="!mt-8">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
