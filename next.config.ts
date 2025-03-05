import type { NextConfig } from "next";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
//import path from "path";

// Ensure dotenv is loaded
require("dotenv").config();


const nextConfig: NextConfig = {

  experimental: {
    esmExternals: true,
  },
  
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },

  webpack(config, { isServer }) {

    
    // Only apply the plugin in client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['python', 'java', 'javascript', 'csharp', 'cpp', 'ruby', 'rust', 'typescript', 'go', 'kotlin', 'graphql'], // Add other languages you need, e.g. 'javascript', 'typescript', etc.
          features: [ '!colorPicker', '!fontZoom', '!gotoSymbol', '!snippet', '!wordHighlighter'], // Add other features you need, e.g. 'accessibilityHelp', 'colorPicker', 'fontZoom', 'gotoSymbol', 'snippets', 'wordHighlighter'
        })
      );
    }
    return config;
  },
};

export default nextConfig;
