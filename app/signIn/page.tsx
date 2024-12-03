// "use client";
// import { signIn } from "next-auth/react";
// import { Box, Button, TextField, Typography, Stack } from "@mui/material";
// import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";
// import { useState } from "react";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleEmailPasswordSignIn = () => {
//     // You can replace this with your authentication logic
//     console.log("Sign in with Email: ", email, password);
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//       bgcolor="#f5f5f5"
//     >
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: 400,
//           p: 4,
//           boxShadow: 3,
//           borderRadius: 2,
//           backgroundColor: "white",
//         }}
//       >
//         <Typography variant="h4" align="center" gutterBottom>
//           Welcome Back!
//         </Typography>

//         {/* Email & Password Form */}
//         <Stack spacing={2}>
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
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mb: 2, bgcolor: "#1a73e8" }}
//             onClick={handleEmailPasswordSignIn}
//           >
//             Sign in with Email
//           </Button>
//         </Stack>

//         {/* Third-party Sign-In Options */}
//         <Typography variant="body2" align="center" sx={{ mb: 2 }} >
//           Or sign in with
//         </Typography>

//         {/* Buttons Row for Google and GitHub */}
//         <Stack direction="row" spacing={2} justifyContent="center">
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{
//               bgcolor: "#db4437",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//             onClick={() => signIn("google")}
//           >
//             <GoogleIcon />
//             Google
//           </Button>
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{
//               bgcolor: "#333",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//             onClick={() => signIn("github")}
//           >
//             <GitHubIcon />
//             GitHub
//           </Button>
//         </Stack>
//       </Box>
//     </Box>
//   );
// }


"use client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Stack, Link } from "@mui/material";
import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;

    // Basic validation
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

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
        window.location.href = "/"; // Redirect to dashboard or home page
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  // Toggle dark/light mode
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [isDarkMode]);

  // const toggleTheme = () => {
  //   setIsDarkMode((prev) => !prev);
  // };

  return (
    <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-black"} min-h-screen`}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: isDarkMode ? "#333" : "#fff",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back!
          </Typography>

          {/* Sign-In Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
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
              {error && (
                <Typography color="error" variant="body2" align="center">
                  {error}
                </Typography>
              )}
              <Button fullWidth variant="contained" type="submit" sx={{ mb: 2, bgcolor: "#1a73e8" }}>
                Sign In
              </Button>
            </Stack>
          </form>

          {/* Third-Party Sign-In Options */}
          <Typography variant="body2" align="center" sx={{ my: 2 }}>
            Or sign in with
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#db4437", display: "flex", alignItems: "center", gap: 1 }}
              onClick={() => signIn("google")}
            >
              <GoogleIcon />
              Google
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#333", display: "flex", alignItems: "center", gap: 1 }}
              onClick={() => signIn("github")}
            >
              <GitHubIcon />
              GitHub
            </Button>
          </Stack>

          {/* Footer Links */}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <Link href="/forgot-password" underline="hover" sx={{ color: "#1a73e8" }}>
              Forgot Password?
            </Link>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Don’t have an account?{" "}
            <Link href="/signup" underline="hover" sx={{ color: "#1a73e8" }}>
              Sign up
            </Link>
          </Typography>

          {/* Theme Toggle */}
          {/* <Button variant="text" fullWidth onClick={toggleTheme} sx={{ mt: 2 }}>
            Toggle {isDarkMode ? "Light" : "Dark"} Mode
          </Button> */}
        </Box>
      </Box>
    </div>
  );
}

