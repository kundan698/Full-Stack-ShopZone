"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export default function RegisterPage() {

  // =====================================================
  // REGISTER FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // =====================================================
  // OTP STATE
  // =====================================================

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [step, setStep] = useState("register");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [seconds, setSeconds] = useState(0);

  const otpRefs = useRef([]);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // REGISTER VALIDATION
  // =====================================================

  const validateRegisterForm = () => {

    const username =
      formData.username.trim();

    const email =
      formData.email.trim().toLowerCase();

    const phone =
      formData.phone.trim();

    const password =
      formData.password;

    const confirmPassword =
      formData.confirmPassword;

    // Username

    if (!username) {
      return "Username is required";
    }

    if (username.length < 3) {
      return "Username must be at least 3 characters";
    }

    if (username.length > 30) {
      return "Username cannot exceed 30 characters";
    }

    // Email

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Phone

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      return "Please enter a valid 10 digit phone number";
    }

    // Password

    if (password.length < 8) {
      return "Password must contain at least 8 characters";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

    if (!passwordRegex.test(password)) {
      return "Password must contain uppercase, lowercase, number and special character";
    }

    // Confirm password

    if (password !== confirmPassword) {
      return "Password and confirm password do not match";
    }

    return null;
  };

  // =====================================================
  // SEND OTP
  // =====================================================

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError =
      validateRegisterForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `http://localhost:3333/website/register-user/insert`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            username:
              formData.username.trim(),

            email:
              formData.email
                .trim()
                .toLowerCase(),

            phone:
              formData.phone.trim(),

            password:
              formData.password,

            confirmPassword:
              formData.confirmPassword,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {

        setError(
          result.message ||
          "Unable to send OTP"
        );

        return;
      }

      setSuccess(
        result.message ||
        "OTP sent successfully"
      );

      setStep("otp");

      setSeconds(
        result?.data?.expiresIn || 300
      );

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);

    } catch (err) {

      console.error(
        "Register API Error:",
        err
      );

      setError(
        "Unable to connect to server"
      );

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // OTP INPUT
  // =====================================================

  const handleOtpChange = (
    index,
    value
  ) => {

    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    setError("");
    setSuccess("");

    if (
      value &&
      index < 5
    ) {

      otpRefs.current[
        index + 1
      ]?.focus();

    }
  };

  // =====================================================
  // OTP KEYBOARD
  // =====================================================

  const handleOtpKeyDown = (
    index,
    e
  ) => {

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {

      otpRefs.current[
        index - 1
      ]?.focus();

    }
  };

  // =====================================================
  // OTP PASTE
  // =====================================================

  const handleOtpPaste = (e) => {

    e.preventDefault();

    const pastedData =
      e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedData) {
      return;
    }

    const newOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pastedData
      .split("")
      .forEach((digit, index) => {

        newOtp[index] = digit;

      });

    setOtp(newOtp);

    const focusIndex =
      Math.min(
        pastedData.length,
        5
      );

    otpRefs.current[
      focusIndex
    ]?.focus();
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const [
    getRegisteredUser,
    setGetRegisteredUser
  ] = useState(false);

  const Router = useRouter();

  useEffect(() => {

    if (getRegisteredUser) {
      Router.push("/Pages/login");
    }

  }, [getRegisteredUser]);

  const handleVerifyOtp = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    const finalOtp =
      otp.join("");

    if (finalOtp.length !== 6) {

      setError(
        "Please enter the complete 6 digit OTP"
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `http://localhost:3333/website/register-user/verify-otp`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            email:
              formData.email
                .trim()
                .toLowerCase(),

            otp: finalOtp,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {

        setError(
          result.message ||
          "OTP verification failed"
        );

        return;
      }

      setSuccess(
        result.message ||
        "User created successfully"
      );

      setGetRegisteredUser(true);

      setStep("success");

    } catch (err) {

      console.error(
        "Verify OTP Error:",
        err
      );

      setError(
        "Unable to connect to server"
      );

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResendOtp = async () => {

    setError("");
    setSuccess("");

    if (seconds > 0) {
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            username:
              formData.username.trim(),

            email:
              formData.email
                .trim()
                .toLowerCase(),

            phone:
              formData.phone.trim(),

            password:
              formData.password,

            confirmPassword:
              formData.confirmPassword,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {

        setError(
          result.message ||
          "Unable to resend OTP"
        );

        return;
      }

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      setSeconds(
        result?.data?.expiresIn || 300
      );

      setSuccess(
        "New OTP sent successfully"
      );

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);

    } catch (err) {

      console.error(err);

      setError(
        "Unable to connect to server"
      );

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // OTP TIMER
  // =====================================================

  useEffect(() => {

    if (
      step !== "otp" ||
      seconds <= 0
    ) {
      return;
    }

    const timer =
      setInterval(() => {

        setSeconds(
          (previous) =>
            previous - 1
        );

      }, 1000);

    return () => {
      clearInterval(timer);
    };

  }, [step, seconds]);

  // =====================================================
  // FORMAT TIMER
  // =====================================================

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  const formattedTime =
    `${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;

  // =====================================================
  // SUCCESS PAGE
  // =====================================================

  if (step === "success") {

    return (

      <main data-testId = 'register-success' className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
            ✓
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Registration Successful
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your email has been verified
            successfully and your account
            has been created.
          </p>

          <button
            onClick={() => {
              window.location.href =
                "/login";
            }}
            className="mt-7 w-full rounded-lg bg-black py-3 font-semibold text-white hover:bg-slate-800 transition"
          >
            Continue to Login
          </button>

        </div>

      </main>

    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (

    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        <div className="text-center mb-7">

          <h1 data-testId = 'create-account' className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {step === "register"
              ? "Register your account"
              : "Verify your email address"}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">

          {/* STEP INDICATOR */}

          <div className="flex items-center mb-8">

            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm ${
                step === "register"
                  ? "bg-black text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {step === "register"
                ? "1"
                : "✓"}
            </div>

            <div className="flex-1 h-1 mx-3 bg-slate-200 overflow-hidden">

              <div
                className={`h-full transition-all duration-500 ${
                  step === "otp" ||
                  step === "success"
                    ? "w-full bg-black"
                    : "w-0"
                }`}
              />

            </div>

            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm ${
                step === "otp" ||
                step === "success"
                  ? "bg-black text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              2
            </div>

          </div>

          {/* ERROR */}

          {error && (

            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>

          )}

          {/* SUCCESS */}

          {success && (

            <div
              role="status"
              className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600"
            >
              {success}
            </div>

          )}

          {/* =================================================
              REGISTER FORM
          ================================================= */}

          {step === "register" && (

            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >

              {/* USERNAME */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  name="username"

                  data-testid="user-name"

                  value={
                    formData.username
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter username"

                  autoComplete="username"

                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"

                  data-testid="email"

                  value={
                    formData.email
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter your email"

                  autoComplete="email"

                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black"
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"

                  data-testid="phone"

                  value={
                    formData.phone
                  }

                  onChange={(e) => {

                    const value =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    if (
                      value.length <= 10
                    ) {

                      setFormData(
                        (previous) => ({
                          ...previous,
                          phone: value,
                        })
                      );

                    }

                    setError("");

                  }}

                  placeholder="10 digit mobile number"

                  maxLength={10}

                  autoComplete="tel"

                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black"
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"

                  data-testid="password"

                  value={
                    formData.password
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter password"

                  autoComplete="new-password"

                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black"
                />

                <p className="mt-2 text-xs text-slate-400">
                  8+ characters, uppercase,
                  lowercase, number and
                  special character.
                </p>

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"

                  data-testid="confirm-password"

                  value={
                    formData.confirmPassword
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Confirm password"

                  autoComplete="new-password"

                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black"
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}

                className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Sending OTP..."
                  : "Create Account"}

              </button>

            </form>

          )}

          {/* =================================================
              OTP FORM
          ================================================= */}

          {step === "otp" && (

            <form
              onSubmit={
                handleVerifyOtp
              }
              className="space-y-6"
            >

              <div className="text-center">

                <p className="text-sm text-slate-500">
                  We have sent a verification
                  code to
                </p>

                <p className="mt-1 font-semibold text-slate-900 break-all">
                  {formData.email}
                </p>

              </div>

              {/* OTP BOXES */}

              <div className="flex justify-center gap-2 sm:gap-3 otp-inputs">

                {otp.map(
                  (digit, index) => (

                    <input
                      key={index}

                      ref={(element) => {
                        otpRefs.current[
                          index
                        ] = element;
                      }}

                      type="text"

                      inputMode="numeric"

                      autoComplete={
                        index === 0
                          ? "one-time-code"
                          : "off"
                      }

                      maxLength={1}

                      value={digit}

                      aria-label={`OTP digit ${index + 1}`}

                      onChange={(e) =>
                        handleOtpChange(
                          index,
                          e.target.value
                        )
                      }

                      onKeyDown={(e) =>
                        handleOtpKeyDown(
                          index,
                          e
                        )
                      }

                      onPaste={
                        index === 0
                          ? handleOtpPaste
                          : undefined
                      }

                      className="h-12 w-10 sm:h-14 sm:w-12 rounded-lg border border-slate-300 text-center text-xl font-bold outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />

                  )
                )}

              </div>

              {/* TIMER */}

              <div className="text-center">

                {seconds > 0 ? (

                  <p className="text-sm text-slate-500">

                    OTP expires in{" "}

                    <span className="font-bold text-slate-900">
                      {formattedTime}
                    </span>

                  </p>

                ) : (

                  <p className="text-sm text-red-500">
                    OTP expired
                  </p>

                )}

              </div>

              {/* VERIFY */}

              <button
                type="submit"

                disabled={
                  loading ||
                  otp.join("").length !== 6 ||
                  seconds <= 0
                }

                className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading
                  ? "Verifying..."
                  : "Verify OTP"}

              </button>

              {/* RESEND */}

              <div className="text-center">

                <button
                  type="button"

                  onClick={
                    handleResendOtp
                  }

                  disabled={
                    loading ||
                    seconds > 0
                  }

                  className="text-sm font-semibold text-black disabled:cursor-not-allowed disabled:text-slate-400"
                >

                  {loading
                    ? "Please wait..."
                    : "Resend OTP"}

                </button>

              </div>

              {/* BACK */}

              <button 
                type="button"

                onClick={() => {

                  setStep("register");

                  setOtp([
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ]);

                  setError("");
                  setSuccess("");

                }}

                className="w-full text-sm text-slate-500 hover:text-black"
              >
                ← Change registration details
              </button>

            </form>

          )}

        </div>

      </div>

    </main>

  );
}