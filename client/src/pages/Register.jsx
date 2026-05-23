import React from "react";
import { SignUpButton } from "@clerk/clerk-react";

export default function RegistrationPage() {
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

          {/* RIGHT: Clerk Sign Up */}
          <div className="p-8 md:p-12 flex flex-col justify-center items-center min-h-[400px]">
            <div className="w-full max-w-md mx-auto text-center space-y-6">
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Create Account</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Please register using Clerk to set up your profile and start curating your news feeds.
              </p>

              <div className="pt-4">
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-6 border border-slate-200 rounded-xl bg-[#5756C5] text-white font-bold hover:bg-[#4a49b0] hover:scale-[1.02] transition duration-200 cursor-pointer shadow-md active:scale-[0.98]"
                  >
                    <svg
                      className="h-5 w-5 fill-current text-white"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
                    </svg>
                    <span>Register with Clerk</span>
                  </button>
                </SignUpButton>
              </div>

              <p className="text-sm text-slate-500 mt-6">
                Already have an account?{" "}
                <a href="/user/login" className="text-indigo-600 font-semibold hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
