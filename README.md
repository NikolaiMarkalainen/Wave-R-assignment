AI GENERATED README

🚀 Getting Started

This guide provides instructions for setting up and running the application, offering two primary methods: running components locally or using a complete Dockerized setup.
📋 Prerequisites

Before starting, ensure you have the following installed:

    Node.js: You must use Node version 24.

    Docker & Docker Compose: Required for running the database locally (Option 1) and for the full containerized setup (Option 2).

💻 Option 1: Running Frontend and Backend Locally

This method requires running the database separately and setting up both the frontend and backend manually.

1. Project Setup (Frontend & Backend)

   Navigate into the frontend and backend directories, and install dependencies using the required Node version:
   Bash

npm install

Environment Variables (Backend): In the backend directory, copy the example environment file:
Bash

    cp .env.example .env

2. Database Setup (Required for Local Backend)

   The backend folder contains a docker-compose.yml file dedicated to running the PostgreSQL database.

   Start the database container from the backend directory:
   Bash

docker compose up -d

Once the database is running, run the following command from the backend directory to apply models and seed initial data:
Bash

    npm run db-setup

3. Launching the Application

   From both the frontend and backend directories, start the development server:
   Bash

   npm run dev

   Frontend Note: If running the frontend locally, you may need to explicitly configure the backend URL to target the local port: localhost:5000.

🐳 Option 2: Full Dockerized Setup (Recommended)

This method builds and runs the entire application, including the database, using a single command from the parent folder.

    Environment Check: Ensure the .env.example file in the appropriate directory is copied to .env before running the build process if environment variables aren't loading automatically.

    Build and Run: From the parent folder (the root directory containing the frontend and backend folders), execute:
    Bash

    docker compose up --build

    This command will build all services, start them with proper environment values, and automatically perform the database seeding/setup.

Accessing the API

Once the containers are successfully running:

    The Swagger API documentation will be available at the api-docs endpoint.

    Authentication: When testing routes via the API documentation, be sure to copy the auth-token and paste it into the designated header secret for authenticated API endpoints.
