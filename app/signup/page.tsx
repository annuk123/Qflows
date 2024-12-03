// "use client";
// import { signIn } from "next-auth/react";
// import { useEffect } from "react";
// import { Box, Button, TextField, Typography, Stack, Link } from "@mui/material";
// import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";
// import { useState } from "react";

// export default function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({ email: '', password: '', username: '' });

//   interface FormState {
//     email: string;
//     password: string;
//     username: string;
//   }

//   interface SignupResponse {
//     message: string;
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();

//     const response = await fetch('/api/auth/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     if (response.ok) {
//       alert('Signup successful!');
//       // Redirect to login or auto-login the user
//     } else {
//       const { message }: SignupResponse = await response.json();
//       alert(`Signup failed: ${message}`);
//     }
//   };

//   const handleEmailPasswordSignUp = async () => {

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     const res = await signIn("credentials", {
//       //redirect: false,
//       email,
//       password,
//       username,
//       confirmPassword
//     });

//     if (res?.error) {
//       setError("Invalid email or password");
//     } else {
//       // Successfully logged in
//       // You can redirect to the dashboard or home page
//       window.location.href = "/dashboard"; // Example of redirection after successful login
//     }
//   };

//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-500'}`}>
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
//       <Box sx={{ width: "100%", maxWidth: 400, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Sign Up to Join Us
//         </Typography>

//         {/* Sign-Up Form */}
//         <Stack spacing={2}>
//           <TextField
//             label="Username"
//             variant="outlined"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <TextField
//             label="Confirm Password"
//             variant="outlined"
//             type="password"
//             fullWidth
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           {error && (
//             <Typography color="error" variant="body2" align="center">
//               {error}
//             </Typography>
//           )}
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mb: 2, bgcolor: "#1a73e8" }}
//             onClick={handleEmailPasswordSignUp}
//           >
//             Sign Up
//           </Button>
//         </Stack>

//         {/* Third-party Sign-Up Options */}

//         <Typography variant="body2" align="center" sx={{ mt: 1 }} className="text-gray-600">
//           Already have an account?{" "}
//           <Link href="/signIn" underline="hover">
//             Sign In
//           </Link>
//         </Typography>
//       </Box>
//     </Box>
//   </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Stack, Link } from "@mui/material";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", username: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem("darkMode", (!prev).toString());
      return !prev;
    });
  };
  
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
    <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-black"} min-h-screen`}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box sx={{ width: "100%", maxWidth: 400, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: isDarkMode ? "#333" : "#fff" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up to Join Us
          </Typography>
          <Stack spacing={2}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              value={form.username}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: isDarkMode ? "#ccc" : "#000" } }}
              sx={{ input: { color: isDarkMode ? "#fff" : "#000" } }}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={form.email}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: isDarkMode ? "#ccc" : "#000" } }}
              sx={{ input: { color: isDarkMode ? "#fff" : "#000" } }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={form.password}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: isDarkMode ? "#ccc" : "#000" } }}
              sx={{ input: { color: isDarkMode ? "#fff" : "#000" } }}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={form.confirmPassword}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: isDarkMode ? "#ccc" : "#000" } }}
              sx={{ input: { color: isDarkMode ? "#fff" : "#000" } }}
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
              onClick={handleSignUp}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </Stack>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Already have an account?{" "}
            <Link href="/signIn" underline="hover" sx={{ color: "#1a73e8" }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

