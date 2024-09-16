"use client";
import React, { useState } from "react";
import { signup } from "../actions";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      await signup(formData);
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center
     bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(https://i.imgur.com/VLrM7tw.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="card w-96 bg-base-100 shadow-xl
      backdrop-filter backdrop-blur-lg
      bg-black/50 border-dotted border-2 border-white/40"
      >
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Anime Aura</h2>
          <p className="text-center text-white/70 text-sm">
            Sign up to create wallpapers
          </p>
          <form onSubmit={submitForm}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                className="input font-medium border-dotted outline-none border-2 border-white/40 p-2 rounded"
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input font-medium border-dotted outline-none border-2 border-white/40 p-2 rounded"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <a href="/login" className="text-white/70">
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
