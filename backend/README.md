# Backend - IO-4

## Overview
This backend powers the IO-4 project, providing automated trading signals and execution based on real-time Twitter sentiment analysis for Solana ecosystem tokens. It integrates AI (via io.net), Twitter data (via RapidAPI), and Solana blockchain trading, exposing a REST API and WebSocket for real-time updates.

---

## Main Features
- **Twitter Sentiment Analysis:** Fetches and analyzes tweets for relevant keywords using AI.
- **AI-Powered Analysis:** Uses io.net's LLM API to extract token, sentiment, and trading signals from tweets.
- **Automated Trading:** Generates and (optionally) executes buy/sell signals on the Solana testnet.
- **WebSocket Broadcasting:** Sends real-time trading signals and execution results to connected clients.
- **REST API:** Provides endpoints for signal history and settings management.

---

## io.net API Usage
- **Endpoint:** `${IO_NET_API_ENDPOINT}/chat/completions`
- **Authentication:** Bearer token via `IO_NET_API_KEY` (from `.env`)
- **Purpose:**
  - Analyzes tweets using a financial market prompt and returns structured JSON with:
    - `token_symbol` (string or null)
    - `sentiment_score` (number, -1.0 to 1.0)
    - `tweet_category` (string)
    - `signal_type` (string)
- **Implementation:**
  - See `src/agents/ioNetClient.ts` and `src/agents/analyzeTweet.ts`.
  - Example request: POST `/chat/completions` with a prompt containing the tweet and system instructions.

---

## Other External APIs
### Twitter (via RapidAPI)
- **Endpoint:** `https://${RAPIDAPI_HOST}/search/`
- **Authentication:** `X-RapidAPI-Key` and `X-RapidAPI-Host` (from `.env`)
- **Purpose:** Fetches recent tweets matching monitored keywords.
- **Implementation:** See `src/services/twitterService.ts`.

### Solana Blockchain
- **Library:** `@solana/web3.js`
- **Endpoint:** `https://api.testnet.solana.com`
- **Purpose:** Executes simulated trades (placeholder logic) on the Solana testnet.
- **Implementation:** See `src/blockchain/connection.ts` and `src/blockchain/tradeExecutor.ts`.

---

## Architecture & Main Flow
1. **Main Loop:**
   - Fetches tweets → Analyzes with io.net → Aggregates results → Generates trading signal → Broadcasts via WebSocket → (Optionally) Executes trade on Solana testnet.
   - See `src/core/mainLoop.ts`.
2. **WebSocket:**
   - Real-time updates for new signals and trade execution results.
   - See `src/services/webSocketService.ts`.
3. **REST API:**
   - `/api/signals/history` (GET): Placeholder for historical signals.
   - `/api/settings` (POST): Update agent settings (placeholder).
   - See `src/api/routes.ts`.

---

## Environment Variables
- `IO_NET_API_KEY`, `IO_NET_API_ENDPOINT`: io.net API credentials
- `RAPIDAPI_KEY`, `RAPIDAPI_HOST`: Twitter RapidAPI credentials
- `PORT`: Backend server port (default: 3001)

---

## Running the Backend
```bash
cd backend
npm install
npm run dev
```

Server runs on [http://localhost:3001](http://localhost:3001) by default.

---

## Notes
- Trading logic is a placeholder; real trading requires integration with a DEX SDK and real tokens.
- The project is for educational/testing purposes on Solana testnet only.  
# Backend setup instructions
# IO Net usage instructions
