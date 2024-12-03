"use client";
import { signOut } from "next-auth/react";
import { Box, Button, Typography, CircularProgress, Divider } from "@mui/material";
import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";
import { useState } from "react";

export default function SignOutPage() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ redirect: false });  // Prevent redirect after sign-out
    setLoading(false);
  };

  const handleOAuthSignIn = (provider: string) => {
    // Redirect the user to the OAuth provider for sign-in (Google or GitHub)
    window.location.href = `/api/auth/signin/${provider}`;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          maxWidth: 400,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" gutterBottom>
          See you soon!
        </Typography>
        <Typography color="text.secondary" mb={3}>
          You are now signed out.
        </Typography>
        
        {/* Sign Out Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignOut}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Out"}
        </Button>

        {/* OAuth Sign In Buttons */}
        <Typography variant="h6" color="text.secondary" mb={2}>
          Or sign in again with
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<GoogleIcon />}
          onClick={() => handleOAuthSignIn("google")}
          sx={{ mb: 2 }}
        >
          Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          startIcon={<GitHubIcon />}
          onClick={() => handleOAuthSignIn("github")}
        >
          GitHub
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* Additional Info */}
        <Typography variant="body2" color="text.secondary">
          By signing out, you will be logged out from the current session. Please sign in again if you'd like to continue.
        </Typography>
      </Box>
    </Box>

  
  );
}

