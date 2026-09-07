"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ================================
  // Email Validation
  // ================================
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ================================
  // Form Validation
  // ================================
  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ================================
  // Input Change
  // ================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setApiError("");
    setSuccessMessage("");

    // Clear current field error
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ================================
  // Button Enable / Disable
  // ================================
  const isFormValid =
    formData.email.trim() !== "" &&
    isValidEmail(formData.email.trim()) &&
    formData.password.length >= 8 &&
    !loading;

  // ================================
  // Login API
  // ================================
  let Router = useRouter();
  let token = localStorage.getItem("token");
  if (token) {
    Router.push("/");
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setApiError("");
      setSuccessMessage("");
      const response = await fetch(
        "http://localhost:3333/website/register-user/user-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setApiError(
          data?.message || "Invalid email or password"
        );
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      setSuccessMessage(
        data?.message || "Login successful"
      );

      // Optional redirect
      // setTimeout(() => {
      //   window.location.href = "/";
      // }, 1000);

    } catch (error) {
      console.error("Login Error:", error);

      setApiError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div
      data-testid="login-page"
      className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4 py-10"
    >
      <div className="w-full max-w-[430px]">

        {/* ==================================
            Login Card
        ================================== */}
        <div
          className="
            bg-white
            rounded-3xl
            px-7 py-9 sm:px-9
            shadow-[0_20px_60px_rgba(0,0,0,0.10)]
            border border-gray-100
            transition-all duration-500
            hover:shadow-[0_25px_70px_rgba(0,0,0,0.14)]
          "
        >

          {/* ==================================
              Header
          ================================== */}
          <div className="text-center mb-8">

            <div
              className="
                mx-auto mb-5
                w-14 h-14
                rounded-2xl
                bg-black
                flex items-center justify-center
                text-white
                text-xl font-bold
                shadow-lg
                transition-transform duration-300
                hover:scale-105
              "
            >
              L
            </div>

            <h1
              data-testid="login-title"
              className="
                text-[30px]
                font-bold
                tracking-tight
                text-gray-900
              "
            >
              Welcome Back
            </h1>

            <p
              data-testid="login-subtitle"
              className="mt-2 text-sm text-gray-500"
            >
              Login to continue to your account
            </p>
          </div>


          {/* ==================================
              API Error
          ================================== */}
          {apiError && (
            <div
              data-testid="login-api-error"
              role="alert"
              className="
                mb-5
                px-4 py-3
                rounded-xl
                bg-red-50
                border border-red-200
                text-red-600
                text-sm
                animate-[shake_0.35s_ease-in-out]
              "
            >
              <div className="flex items-center gap-2">
                <span>⚠</span>
                <span>{apiError}</span>
              </div>
            </div>
          )}


          {/* ==================================
              Success
          ================================== */}
          {successMessage && (
            <div
              data-testid="login-success"
              role="status"
              className="
                mb-5
                px-4 py-3
                rounded-xl
                bg-green-50
                border border-green-200
                text-green-700
                text-sm
                animate-[fadeIn_0.4s_ease-out]
              "
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">✓</span>
                <span>{successMessage}</span>
              </div>
            </div>
          )}


          {/* ==================================
              Form
          ================================== */}
          <form
            data-testid="login-form"
            onSubmit={handleLogin}
            noValidate
          >

            {/* ==================================
                Email
            ================================== */}
            <div className="mb-6">

              <div className="relative">

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  data-testid="login-email"
                  aria-invalid={!!errors.email}
                  placeholder=" "
                  className={`
                    peer
                    w-full
                    h-[58px]
                    px-4 pt-5 pb-1
                    rounded-xl
                    bg-white
                    border
                    text-gray-900
                    outline-none
                    transition-all
                    duration-300
                    ease-out

                    ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        : "border-gray-300 focus:border-black focus:ring-4 focus:ring-gray-100"
                    }
                  `}
                />

                <label
                  htmlFor="login-email"
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    bg-white
                    px-1
                    text-gray-500
                    pointer-events-none

                    transition-all
                    duration-300
                    ease-out

                    peer-focus:top-0
                    peer-focus:text-xs
                    peer-focus:text-black

                    peer-not-placeholder-shown:top-0
                    peer-not-placeholder-shown:text-xs
                    peer-not-placeholder-shown:text-gray-600
                  "
                >
                  Email Address
                </label>

              </div>

              {errors.email && (
                <p
                  id="login-email-error"
                  data-testid="login-email-error"
                  className="
                    mt-1.5
                    ml-1
                    text-xs
                    text-red-500
                    animate-[fadeIn_0.2s_ease-out]
                  "
                >
                  {errors.email}
                </p>
              )}

            </div>


            {/* ==================================
                Password
            ================================== */}
            <div className="mb-5">

              <div className="relative">

                <input
                  id="login-password"
                  name="password"
                  type={
                    showPassword ? "text" : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  data-testid="login-password"
                  aria-invalid={!!errors.password}
                  placeholder=" "
                  className={`
                    peer
                    w-full
                    h-[58px]
                    px-4 pt-5 pb-1
                    pr-14
                    rounded-xl
                    bg-white
                    border
                    text-gray-900
                    outline-none
                    transition-all
                    duration-300
                    ease-out

                    ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        : "border-gray-300 focus:border-black focus:ring-4 focus:ring-gray-100"
                    }
                  `}
                />

                <label
                  htmlFor="login-password"
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    bg-white
                    px-1
                    text-gray-500
                    pointer-events-none

                    transition-all
                    duration-300
                    ease-out

                    peer-focus:top-0
                    peer-focus:text-xs
                    peer-focus:text-black

                    peer-not-placeholder-shown:top-0
                    peer-not-placeholder-shown:text-xs
                    peer-not-placeholder-shown:text-gray-600
                  "
                >
                  Password
                </label>


                {/* Show Password */}
                <button
                  type="button"
                  data-testid="toggle-password"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-xs
                    font-medium
                    text-gray-500
                    hover:text-black
                    transition-all
                    duration-200
                  "
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {errors.password && (
                <p
                  id="login-password-error"
                  data-testid="login-password-error"
                  className="
                    mt-1.5
                    ml-1
                    text-xs
                    text-red-500
                    animate-[fadeIn_0.2s_ease-out]
                  "
                >
                  {errors.password}
                </p>
              )}

            </div>


            {/* ==================================
                Forgot Password
            ================================== */}
            <div className="flex justify-end mb-7">

              <button
                type="button"
                data-testid="forgot-password"
                className="
                  text-sm
                  font-medium
                  text-gray-600
                  hover:text-black
                  transition-colors
                  duration-200
                "
              >
                Forgot Password?
              </button>

            </div>


            {/* ==================================
                Login Button
            ================================== */}
            <button
              type="submit"
              data-testid="login-submit"
              disabled={!isFormValid}
              className={`
                relative
                w-full
                h-[56px]
                rounded-xl
                font-semibold
                text-sm
                overflow-hidden

                transition-all
                duration-300
                ease-out

                ${
                  isFormValid
                    ? `
                      bg-black
                      text-white
                      shadow-lg
                      hover:-translate-y-0.5
                      hover:shadow-xl
                      active:translate-y-0
                      cursor-pointer
                    `
                    : `
                      bg-gray-200
                      text-gray-400
                      cursor-not-allowed
                    `
                }
              `}
            >

              {loading ? (
                <span className="flex items-center justify-center gap-3">

                  <span
                    className="
                      w-5 h-5
                      border-2
                      border-white
                      border-t-transparent
                      rounded-full
                      animate-spin
                    "
                  />

                  Logging in...

                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Login
                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </span>
              )}

            </button>

          </form>


          {/* ==================================
              Register
          ================================== */}
          <div className="mt-7 text-center">

            <span className="text-sm text-gray-500">
              Don't have an account?{" "}
            </span>

            <button
              type="button"
              data-testid="register-link"
              className="
                text-sm
                font-semibold
                text-black
                hover:underline
                underline-offset-4
                transition-all
              "
            >
              Create Account
            </button>

          </div>

        </div>

      </div>


      {/* ==================================
          Custom Animations
      ================================== */}
      {/* <style jsx>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }

          25% {
            transform: translateX(-5px);
          }

          50% {
            transform: translateX(5px);
          }

          75% {
            transform: translateX(-4px);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}

    </div>
  );
}