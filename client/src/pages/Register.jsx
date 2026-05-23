import React from "react";
import { useForm } from "react-hook-form";
import API from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SignUpButton } from "@clerk/clerk-react";


export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { fullName, email, password } = data;
    try {
      const res = await API.post("auth/register", {
        fullName,
        email,
        password,
      });
      if (res?.data?.success) {
        toast.success("Registration is successfull", {
          duration: 4000,
        });
      } else {
        toast.error(res.data.message);
      }
      navigate("/");
    } catch (error) {
      console.error("Error occured in Register", error);
      toast.error("Internal Server Error");
    }
    reset();
  };

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#454955] via-[#2e3032] to-[#1f2123]">
      <div className="w-full max-w-5xl mx-4 rounded-2xl shadow-2xl overflow-hidden bg-white/95 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: Intro Section */}
          <div className="p-10 flex flex-col justify-center gap-6 bg-gradient-to-br from-[#2f313a] to-[#3a3942] text-white">
            <h2 className="text-3xl font-semibold">Welcome to NewsBlitz</h2>
            <p className="text-slate-200">
              Get All Top News and be the Smartest
            </p>

            <ul className="mt-6 space-y-3 text-slate-200 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold">✔</span>
                <span>Top News — Get top news all in one page.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold">✔</span>
                <span>AI Summarizer — AI gives summary of the news.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold">✔</span>
                <span>Simple & Easy — Just Choose and Get Started.</span>
              </li>
            </ul>
          </div>

          {/* RIGHT: Registration Form */}
          <div className="p-8 md:p-12 flex items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md mx-auto"
            >
              <h3 className="text-2xl font-semibold text-slate-800">
                Create account
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Enter your details to get started.
              </p>

              <div className="mt-6 space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Full name
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                      errors.fullName ? "border-red-300" : "border-slate-200"
                    }`}
                    placeholder="Alex Johnson"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                      errors.email ? "border-red-300" : "border-slate-200"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                      errors.password ? "border-red-300" : "border-slate-200"
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-slate-200"
                    }`}
                    placeholder="Repeat password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div> */}

                {/* Show Password Toggle */}
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded text-indigo-600 focus:ring-0"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className="text-slate-600">Show password</span>
                  </label>

                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Need help?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition duration-200 cursor-pointer active:scale-[0.98]"
                >
                  Create account
                </button>

                {/* Clerk Register Option */}
                <div className="relative my-5 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <span className="relative bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Or continue with
                  </span>
                </div>

                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-slate-200 rounded-lg bg-[#5756C5]/5 text-[#5756C5] font-semibold hover:bg-[#5756C5]/10 hover:border-[#5756C5]/30 hover:scale-[1.01] transition duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <svg
                      className="h-5 w-5 fill-current text-[#5756C5]"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
                    </svg>
                    <span>Register with Clerk</span>
                  </button>
                </SignUpButton>

                <p className="text-center text-sm text-slate-500 mt-2">
                  Already have an account?{" "}
                  <a href="/user/login" className="text-indigo-600 font-medium hover:underline">
                    Login
                  </a>
                </p>

                <p className="text-center text-xs text-slate-400 mt-4">
                  By signing up you agree to our{" "}
                  <a href="#" className="text-indigo-600 hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

