# 🤖 Autonomous Market Sentinel

**Fully autonomous market maker agent on Unicity Sphere SDK for Testnet v2**

## 📋 Overview

Autonomous Market Sentinel is a fully autonomous economic agent operating on the Unicity Testnet v2. It performs market making without human intervention: scanning the Intent Market, analyzing incoming offers, automatically creating its own intents, and accepting profitable deals.

### Key Features

✅ **Full Autonomy (Agentic)** — runs in an infinite loop without human intervention
✅ **Identity & Wallet** — has a unique Unicity Identity and persistent wallet
✅ **Intent Market Integration** — automatically scans and participates in the intent market
✅ **Smart Order Matching** — analyzes incoming PaymentRequests based on predefined rules
✅ **Auto Market Making** — places its own intents every 30 seconds
✅ **Messaging Service** — public service for interacting with other agents via DM
✅ **Broadcast Status** — publishes activity status to the network every 60 seconds
✅ **Comprehensive Logging** — logs all actions to console and file

## 🎯 Use Case

The agent solves the real problem of liquidity in decentralized networks:

- **For the network**: provides constant liquidity by automatically accepting and creating intents
- **For other agents**: provides a public service — any agent can send a DM or PaymentRequest
- **For the ecosystem**: demonstrates the capabilities of fully autonomous economic agents

## 🛠️ Technologies

- **Runtime**: Node.js 18+
- **SDK**: @unicitylabs/sphere-sdk
- **Network**: Unicity Testnet v2
- **Primitives**: payments, payment requests, swaps, intent market, messaging, nametags

## 📦 Installation

### Requirements

- Node.js version 18.0.0 or higher
- npm (comes with Node.js)

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/Maxxx5/autonomous-market-sentinel.git
cd autonomous-market-sentinel

# Install dependencies
npm install

# Run the agent
node src/index.mjs