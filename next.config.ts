import type { NextConfig } from "next";

// Ensure dotenv is loaded
require('dotenv').config();

const nextConfig: NextConfig = {
  env: {
    GITHUB_ID: process.env.GITHUB_ID || '', // Use descriptive names here
    GITHUB_SECRET: process.env.GITHUB_SECRET || '', // Use descriptive names here
  },
};

export default nextConfig;
