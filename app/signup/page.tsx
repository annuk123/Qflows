

"use client";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Stack, Link } from "@mui/material";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", username: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  
  const handleSignUp = async () => {
    const { email, password, username, confirmPassword } = form;

    // Basic validation
    if (!email || !password || !username || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {

      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });
      
      const result = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        window.location.href = "/signIn";
      } else {
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
    {/* Outer container for gradient border */}
    <div className="relative p-1 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-border">
      {/* Inner card */}
      <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl text-gray-400 font-bold text-center mb-6">Sign Up to join us!</h1>

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={form.username}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#6B7280"} }}
            sx={{ input: { color: "#6B7280" } }}
          />

          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={form.email}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#6B7280" } }}
            sx={{ input: { color: "#6B7280" } }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={form.password}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#6B7280" } }}
            sx={{ input: { color: "#6B7280" } }}
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={form.confirmPassword}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#6B7280" } }}
            sx={{ input: { color: "#6B7280", } }}
          />
          {error && (
            <Typography color="error" variant="body2" align="center" role="alert" aria-live="assertive">
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, bgcolor: "#1a73e8" }}
            type="submit"
            disabled={isSubmitting}
            onClick={handleSignUp}

          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>



        <Typography variant="body2" align="center" sx={{ mt: 1, color:"#6B7280"}}>
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
