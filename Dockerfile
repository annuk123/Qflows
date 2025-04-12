# Use a Node.js base image with Rust support
FROM rust:latest AS rust-builder
RUN cargo install rust-script

# Use Node.js official image
FROM node:18 AS app
WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the entire project, including the prisma directory
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Set the Rust script binary path
ENV PATH="/root/.cargo/bin:$PATH"

# Start the Next.js server
CMD ["npm", "run", "dev"]
