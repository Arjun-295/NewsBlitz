import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

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
        { withCredentials: true }
      );
      console.log(res);
      if (res?.data?.success) {
        toast.success("Successfully Logged In", {
          duration: 4000,
        });
        localStorage.setItem("token", res.data.token);
      } else {
        toast.error(res.data.message);
      }
      navigate("/user/news-feed");
    } catch (error) {
      console.log("Error occured in Login", error);
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
                  className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
                >
                  Login
                </button>

                <p className="text-center text-sm text-slate-500">
                  Don't have an account?{" "}
                  <a href="/register" className="text-indigo-600">
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
