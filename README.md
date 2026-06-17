
1. System & Software Prerequisites
Ensure you have the following installed on your machine:
Node.js: Version 18.x or 20.x+ (Recommended). Download Node.js.
Visual Studio Code: Download VS Code.
Google Gemini API Key: You need an API key to power the AI audio transcription and study pack generators. Get one free from Google AI Studio.
2. Local Project Directory Structure
Create a folder on your computer (e.g., lecture-voice-to-notes/) and copy the code blocks into files corresponding strictly to this directory tree:
code
Text
lecture-voice-to-notes/
├── .env                       <-- Environment credentials (created by you)
├── .env.example               <-- Sample environment values
├── index.html                 <-- Outer entry markup page
├── package.json               <-- Project metadata and execution scripts
├── server.ts                  <-- Node Express back-end & Gemini API client
├── tsconfig.json              <-- TypeScript configuration
├── vite.config.ts             <-- Vite bundler config
└── src/
    ├── App.tsx                <-- Primary React application layout
    ├── index.css              <-- CSS & Tailwind v4 theme definitions
    ├── main.tsx               <-- React mount bootstrap file
    ├── types.ts               <-- Shared TypeScript interfaces
    ├── components/
    │   └── DashboardView.tsx  <-- Landing dashboard component
    └── utils/
        └── export.ts          <-- PDF, Word (DOCX) & TXT download managers
3. Setup & Installation Steps
Step 1: Open Terminal in VS Code
Open Visual Studio Code.
Select File > Open Folder... and select your lecture-voice-to-notes folder.
Open the built-in terminal by pressing Ctrl + ` (or `Cmd + `` on macOS).
Step 2: Initialize dependencies
Install all required Node modules by running this single command in your terminal:
code
npm install
This installs React, Vite, Express, Lucide-react (icons), Framer Motion (animations), Tailwind CSS, and the @google/genai TypeScript SDK.
Step 3: Setup Google Gemini API Key
Create a new file in the root directory and name it .env
Paste the following line, replacing the placeholder with your actual key:
code
Env
GEMINI_API_KEY=AIzaSyYourActualKeyGoesHere...
Step 4: Start the Local Development Server
Launch the dual-mode Express + Vite development environment by executing:
code
Bash
npm run dev
The backend Express server and Vite frontend compiler will boot concurrently on:
👉 http://localhost:3000
Open that URL in your browser to experience the application.
4. Advanced: Production Build & Deployment
When you are ready to bundle production-ready client assets and compile the server code into a minified, high-performance back-end file, run:
code
Bash
# Clean intermediate folders and build minified code
npm run build

# Start the compiled high-efficiency production app
npm run start


