// lib/useBinanceDepth.ts
import { useEffect, useRef, useState } from "react";
import { useTradingPair } from "@/app/context/TradingPairContext";
import { useSnackbar } from "@/app/context/SnackbarProvider";

export const useBinanceDepth = () => {
  const { pair } = useTradingPair();
  const { showSnackbar } = useSnackbar();
  const [bids, setBids] = useState<[string, string][]>([]);
  const [asks, setAsks] = useState<[string, string][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (wsRef.current) {
      wsRef.current.close();
    }

    const baseURL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    const url = `${baseURL}/${pair.toLowerCase()}@depth10@100ms`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      showSnackbar({
        message: `Connected to ${pair.toUpperCase()} orderbook`,
        severity: "success",
      });
      setLoading(false);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.bids && data?.asks) {
          setBids(data.bids);
          setAsks(data.asks);
        }
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("WebSocket message parse error:", err);
        }
      }
    };

    ws.onerror = (err) => {
      if (process.env.NODE_ENV === "development") {
        console.error("WebSocket error:", err);
      }

      setError("Live order book data is temporarily unavailable.");
      setLoading(false);
      showSnackbar({
        message: "⚠️ Real-time data unavailable. Reconnecting...",
        severity: "warning",
      });
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        showSnackbar({
          message: "WebSocket connection closed cleanly",
          severity: "info",
        });
      } else {
        showSnackbar({
          message: "WebSocket disconnected unexpectedly. Retry?",
          severity: "error",
          actionLabel: "Retry",
          onAction: () => window.location.reload(),
        });
      }
    };
    

    return () => {
      ws.close();
    };
  }, [pair, showSnackbar]);
  
  return { bids, asks, loading, error };
};
