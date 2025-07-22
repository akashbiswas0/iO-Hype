# IO-hype Automated Solana Trading Signals via Twitter Sentiment & AI

## Overview

IO-hype is an automated trading system that leverages real-time Twitter sentiment analysis, AI (via io.net), and Solana blockchain integration to generate and (optionally) execute trading signals for Solana ecosystem tokens. The project consists of a backend (Node.js/TypeScript) and a frontend (Next.js/React) for real-time monitoring and configuration.

---

## Features

- **Twitter Sentiment Analysis:** Fetches and analyzes tweets for relevant keywords using AI.
- **AI-Powered Analysis:** Uses io.net’s LLM API to extract token, sentiment, and trading signals from tweets.
- **Automated Trading:** Generates and (optionally) executes buy/sell signals on the Solana testnet.
- **WebSocket Broadcasting:** Sends real-time trading signals and execution results to connected clients.
- **REST API:** Provides endpoints for signal history and settings management.
- **Frontend Dashboard:** Real-time dashboard for monitoring signals, execution logs, and (future) configuration.

---

## io.net API Usage

- **Endpoint:** `${IO_NET_API_ENDPOINT}/chat/completions`
- **Authentication:** Bearer token via `IO_NET_API_KEY` (from `.env`)
- **Purpose:**  
  Analyzes tweets using a financial market prompt and returns structured JSON with:
  - `token_symbol` (string or null)
  - `sentiment_score` (number, -1.0 to 1.0)
  - `tweet_category` (string)
  - `signal_type` (string)
- **Implementation:**  
  - See `backend/src/agents/ioNetClient.ts` and `backend/src/agents/analyzeTweet.ts`.
  - Example request: POST `/chat/completions` with a prompt containing the tweet and system instructions.

---

## Project Structure

```
.
├── backend/   # Node.js/TypeScript backend (API, WebSocket, trading logic)
├── frontend/  # Next.js/React frontend (dashboard UI)
└── README.md
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- io.net API credentials
- RapidAPI credentials for Twitter
- Solana testnet wallet (for backend trading simulation)

---

### 1. Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**  
   Create a `.env` file in `backend/` with the following:
   ```
   IO_NET_API_KEY=your_io_net_api_key
   IO_NET_API_ENDPOINT=https://api.ionet.com/v1
   RAPIDAPI_KEY=your_rapidapi_key
   RAPIDAPI_HOST=twitter-api-host
   TESTNET_PRIVATE_KEY=your_base58_private_key
   PORT=3001
   ```

3. **Run the backend server:**
   ```bash
   npm run dev
   ```
   The backend will be available at [http://localhost:3001](http://localhost:3001).

---

### 2. Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Run the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

3. **Usage:**  
   - Open the dashboard in your browser.
   - Ensure the backend is running for full functionality (live signals, execution logs, etc.).

---

## Notes

- **Trading logic is a placeholder:** Real trading requires integration with a DEX SDK and real tokens. The current implementation simulates trades on the Solana testnet.
- **Educational/testing use only:** This project is for educational and testing purposes on the Solana testnet.
- **WebSocket:** The frontend receives live updates from the backend WebSocket server (`ws://localhost:3001`).

---


