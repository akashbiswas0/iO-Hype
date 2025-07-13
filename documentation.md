# IO-hype: Tech Stack & Implementation Documentation

---

## Overview
IO-hype is an automated trading system that leverages real-time Twitter sentiment analysis, AI (via io.net), and Solana blockchain integration to generate and (optionally) execute trading signals for Solana ecosystem tokens. The project consists of a backend (Node.js/TypeScript) and a frontend (Next.js/React) for real-time monitoring and configuration.

---

# Tech Stack

## Backend
- **Language:** TypeScript (Node.js)
- **Frameworks/Libraries:**
  - Express (REST API)
  - ws (WebSocket server)
  - axios (HTTP requests)
  - dotenv (Environment variable management)
  - @solana/web3.js, @solana/spl-token (Solana blockchain integration)
- **AI Integration:** io.net LLM API
- **Twitter Integration:** RapidAPI (Twitter search)
- **Dev Tools:** ts-node, nodemon, typescript

## Frontend
- **Language:** TypeScript
- **Framework:** Next.js (React)
- **UI:** Tailwind CSS
- **Libraries:**
  - axios (HTTP requests)
  - sentiment (local sentiment analysis, future use)
- **WebSocket:** Native browser WebSocket API

---

# Backend Implementation Details

## Architecture
- **Main Loop:** (`backend/src/core/mainLoop.ts`)
  - Periodically fetches tweets matching monitored keywords.
  - Analyzes tweets using io.net LLM API.
  - Aggregates results and generates trading signals.
  - Broadcasts signals via WebSocket.
  - Optionally executes trades on Solana testnet.
- **REST API:** (`backend/src/api/routes.ts`)
  - `/api/signals/history` (GET): Placeholder for historical signals.
  - `/api/settings` (POST): Update agent settings (placeholder).
- **WebSocket:** (`backend/src/services/webSocketService.ts`)
  - Broadcasts real-time trading signals and execution results to clients.

## Key Integrations
- **io.net LLM API:** (`backend/src/agents/ioNetClient.ts`, `backend/src/agents/analyzeTweet.ts`)
  - Uses API key and endpoint from environment variables.
  - Sends tweet text and receives structured analysis (token, sentiment, category, signal type).
- **Twitter (RapidAPI):** (`backend/src/services/twitterService.ts`)
  - Searches for tweets using keywords.
  - Parses and returns relevant tweet data.
- **Solana Blockchain:** (`backend/src/blockchain/connection.ts`, `backend/src/blockchain/tradeExecutor.ts`)
  - Simulates trades on Solana testnet (placeholder logic).
  - Uses @solana/web3.js for transaction creation and signing.

## Environment Variables
- `IO_NET_API_KEY`, `IO_NET_API_ENDPOINT`: io.net API credentials
- `RAPIDAPI_KEY`, `RAPIDAPI_HOST`: Twitter RapidAPI credentials
- `PORT`: Backend server port (default: 3001)
- `TESTNET_PRIVATE_KEY`: Solana testnet wallet

## Main Flow Example
1. **Fetch Tweets:** via `fetchRecentTweets` (Twitter API)
2. **Analyze:** via `analyzeTweet` (io.net LLM)
3. **Signal Generation:** via `getTradingSignal`
4. **Broadcast:** via WebSocket
5. **(Optional) Execute Trade:** via `executeTrade` (Solana testnet)

---

# Frontend Implementation Details

## Architecture
- **Dashboard Page:** (`frontend/app/page.tsx`)
  - Main entry point, renders Signal Feed and Execution Log.
- **Signal Feed:** (`frontend/app/components/signal-feed.tsx`)
  - Displays live trading signals from backend via WebSocket.
- **Execution Log:** (`frontend/app/components/execution-log.tsx`)
  - Shows trade execution results and system events in real time.
- **Config Panel:** (`frontend/app/components/config-panel.tsx`)
  - UI for toggling agent settings (auto-trading, etc.; currently placeholder).
- **WebSocket Hook:** (`frontend/app/lib/hooks/useWebSocket.ts`)
  - Manages real-time connection to backend WebSocket server.

## Data Flow
- **WebSocket:**
  - Connects to `ws://localhost:3001` for live updates.
  - Signal Feed and Execution Log update in real time as messages are received.
- **REST API:**
  - (Planned) For fetching historical data and updating settings.

## UI/UX
- **Tailwind CSS:** Used for styling and responsive layout.
- **Component-based:** Modular React components for dashboard, feed, log, and config.

---

# Key Files & References
- **Backend:**
  - `src/core/mainLoop.ts` (main logic loop)
  - `src/agents/ioNetClient.ts`, `src/agents/analyzeTweet.ts` (AI integration)
  - `src/services/twitterService.ts` (Twitter integration)
  - `src/blockchain/tradeExecutor.ts` (Solana trading logic)
  - `src/services/webSocketService.ts` (WebSocket server)
  - `src/api/routes.ts` (REST API routes)
- **Frontend:**
  - `app/page.tsx` (dashboard entry)
  - `app/components/signal-feed.tsx` (signal feed)
  - `app/components/execution-log.tsx` (execution log)
  - `app/components/config-panel.tsx` (config panel)
  - `app/lib/hooks/useWebSocket.ts` (WebSocket hook)

---

# Notes
- **Trading logic is a placeholder:** Real trading requires integration with a DEX SDK and real tokens. The current implementation simulates trades on the Solana testnet.
- **Educational/testing use only:** This project is for educational and testing purposes on the Solana testnet.
- **WebSocket:** The frontend receives live updates from the backend WebSocket server (`ws://localhost:3001`).

---

# Further Reading
- [io.net Documentation](https://docs.ionet.com/)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
