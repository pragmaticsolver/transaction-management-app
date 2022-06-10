# Transaction Management App

Transaction Management App, built with Vite + React + Tailwind CSS, powered by Firebase.

## Setup

1. Clone the project and setup dependencies:

   ### Install dependencies
   npm install

   ### Setup environment variables
   cp env.example .env

2. Copy the relevant config values (values that I emailed to you) to `.env`

3. Import data.json to the firestore

      ### Install dependencies
      cd functions
      npm install

      ### import json data to the firestore
      node import.js

4. Start the dev server with the command `npm run dev`. Open your browser and point it to `localhost:3000`
