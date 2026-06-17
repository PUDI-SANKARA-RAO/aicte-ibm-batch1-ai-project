

**Prerequisites:**  Node.js

nstallation & API Key Setup Guide
To run your application locally or in a cloud container, follow these steps:
1. Setup API Credentials
This application utilizes server-side API routing to proxy requests and keep your keys secure.
Go to Settings > Secrets inside your Google AI Studio workspace or create a .env file in the root directory.
Bind your key to the variable:
code
Env
GEMINI_API_KEY="YOUR_ACTUAL_GEMINI_API_KEY"
2. Install Project Dependencies
Run this command in your terminal to populate the package modules:
code
Bash
npm install
3. Start Development Server
Boot your active application stream on standard port 3000:
code
Bash
npm run dev
4. Compile Production Builds
Compile and bundle your assets for live deployments:
code
Bash
npm run build
npm run start
