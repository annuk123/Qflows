"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stack, Button, Typography, Link } from "@mui/material";
import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";
import { z } from "zod";

// Zod schema for validation
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate form using Zod
    const validationResult = signInSchema.safeParse(form);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message;
      setError(firstError || "Invalid input");
      return;
    }

    const { email, password } = form;

    // Try using next-auth for credential-based login
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        // Successfully signed in
        router.push("/Welcome"); // Redirect after login
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="relative p-1 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-border">
        <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <Typography variant="h4" align="center" sx={{ color: "#E4E4E7", mb: 4 }}>
            Welcome Back!
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border bg-gray-800 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border bg-gray-800 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
            />
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#1a73e8", mt: 2 }}
            >
              Sign In
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 3, color: "#9CA3AF" }}>
            Or sign in with
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#db4437", display: "flex", alignItems: "center", gap: 1 }}
              onClick={() => signIn("google")}
            >
              <GoogleIcon />
              Google
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#333", display: "flex", alignItems: "center", gap: 1 }}
              onClick={() => signIn("github")}
            >
              <GitHubIcon />
              GitHub
            </Button>
          </Stack>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <Link href="/forgot-password" underline="hover" sx={{ color: "#1a73e8" }}>
              Forgot Password?
            </Link>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1, color: "#9CA3AF" }}>
            Don’t have an account?{" "}
            <Link href="/signup" underline="hover" sx={{ color: "#1a73e8" }}>
              Sign up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}
