# 🪙 Real-Time BTC-USD Orderbook & Market Indicators

This project is a real-time, responsive cryptocurrency dashboard built using **Next.js 13+**, which visualizes BTC-USD orderbook data and key market indicators to support trading decisions.

---

## 📦 Stack Overview

- **Framework:** [Next.js 13+](https://nextjs.org) with App Router
- **UI Library:** [Material UI (MUI)](https://mui.com)
- **Charts:** [Recharts](https://recharts.org/en-US/) for dynamic, real-time charting
- **Live Data:** Binance Public WebSocket API (`wss://stream.binance.com:9443/ws`)
- **Deployment:** [Vercel](https://vercel.com/)
- **State Management:** React hooks with context for modular updates
- **WebSocket Handling:** Custom hook `useBinanceDepth` for subscribing to live streams

---

## 🔍 Assumptions

- The app focuses on **BTC-USD**, but includes a dropdown (`PairSelector`) to support other pairs supported by Binance.
- The user has access to the internet and WebSocket connections are not blocked.
- Binance’s WebSocket provides free public access with rate limits suitable for demo use.

---

