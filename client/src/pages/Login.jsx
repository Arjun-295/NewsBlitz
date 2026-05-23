import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";


export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await api.post(
        "auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      if (res?.data?.success) {
        toast.success("Successfully Logged In", {
          duration: 4000,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/user/news-feed");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error occured in Login", error);
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
            <h2 className="text-3xl font-semibold">Welcome Back!</h2>
            <p className="text-slate-200">
              Login to access NewsBlitz instantly
            </p>

            <ul className="mt-6 space-y-3 text-slate-200 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold">✔</span>
                <span>Access Top Tech News — All in one place.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold">✔</span>
                <span>AI-Powered Summaries for every article.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold">✔</span>
                <span>Stay Smart — Stay Updated.</span>
              </li>
            </ul>
          </div>

          {/* RIGHT: Login Form */}
          <div className="p-8 md:p-12 flex items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md mx-auto"
            >
              <h3 className="text-2xl font-semibold text-slate-800">Login</h3>
              <p className="mt-2 text-sm text-slate-500">
                Enter your credentials to continue.
              </p>

              <div className="mt-6 space-y-4">
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
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition duration-200 cursor-pointer active:scale-[0.98]"
                >
                  Login
                </button>

                {/* Clerk Login Option */}
                <div className="relative my-5 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <span className="relative bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Or continue with
                  </span>
                </div>

                <SignInButton mode="modal">
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
                    <span>Continue with Clerk</span>
                  </button>
                </SignInButton>

                <p className="text-center text-sm text-slate-500 mt-2">
                  Don't have an account?{" "}
                  <a href="/user/register" className="text-indigo-600 font-medium hover:underline">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

