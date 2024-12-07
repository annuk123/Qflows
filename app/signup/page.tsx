"use client";
import { useState } from "react";
import { TextField, Button, Typography, Link } from "@mui/material";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", username: "", confirmPassword: "" });
  const [error, setError] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    general: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" })); // Clear error for the field
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, username, confirmPassword } = form;

    // Reset errors
    setError({
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
      general: "",
    });

    // Basic validation
    let hasError = false;
    if (!email) {
      setError((prev) => ({ ...prev, email: "Email is required." }));
      hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError((prev) => ({ ...prev, email: "Invalid email format." }));
      hasError = true;
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required." }));
      hasError = true;
    } else if (password.length < 8) {
      setError((prev) => ({ ...prev, password: "Password must be at least 8 characters." }));
      hasError = true;
    }
    if (!username) {
      setError((prev) => ({ ...prev, username: "Username is required." }));
      hasError = true;
    }
    if (!confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: "Confirm Password is required." }));
      hasError = true;
    } else if (password !== confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        window.location.href = "/signIn";
      } else if (result.error === "Username already exists") {
        setError((prev) => ({ ...prev, username: "This username is not available." }));
      } else {
        setError((prev) => ({ ...prev, general: "Signup failed. Please try again." }));
      }
    } catch {
      setError((prev) => ({ ...prev, general: "An unexpected error occurred. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="relative p-1 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-border">
        <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl text-gray-400 font-bold text-center mb-6">Sign Up to Join Us!</h1>

          <form onSubmit={handleSignUp} className="space-y-4">
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              value={form.username}
              onChange={handleInputChange}
              error={!!error.username}
              helperText={error.username}
              InputLabelProps={{ style: { color: "#6B7280" } }}
              sx={{ input: { color: "#d1d5db" } }}
            />

            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={form.email}
              onChange={handleInputChange}
              error={!!error.email}
              helperText={error.email}
              InputLabelProps={{ style: { color: "#6B7280" } }}
              sx={{ input: { color: "#d1d5db" } }}
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={form.password}
              onChange={handleInputChange}
              error={!!error.password}
              helperText={error.password}
              InputLabelProps={{ style: { color: "#6B7280" } }}
              sx={{ input: { color: "#d1d5db" } }}
            />

            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={form.confirmPassword}
              onChange={handleInputChange}
              error={!!error.confirmPassword}
              helperText={error.confirmPassword}
              InputLabelProps={{ style: { color: "#6B7280" } }}
              sx={{ input: { color: "#d1d5db" } }}
            />

            {error.general && (
              <Typography color="error" variant="body2" align="center" role="alert" aria-live="assertive">
                {error.general}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2, bgcolor: "#1a73e8" }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 1, color: "#6B7280" }}>
            Already have an account?{" "}
            <Link href="/signIn" underline="hover" sx={{ color: "#1a73e8" }}>
              Sign In
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}
