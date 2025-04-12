// lib/useBinanceDepth.ts
import { useEffect, useRef, useState } from 'react';
import { useTradingPair } from '@/app/context/TradingPairContext';
import { useSnackbar } from '@/app/context/SnackbarProvider';

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

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@depth10@100ms`);
    wsRef.current = ws;

    ws.onopen = () => {
      showSnackbar(`Connected to ${pair.toUpperCase()} orderbook`, 'success');
      setLoading(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBids(data.bids);
      setAsks(data.asks);
    };

    ws.onerror = () => {
      setError('WebSocket error: Could not fetch data');
      setLoading(false);
      showSnackbar('WebSocket error: failed to connect', 'error');
    };

    ws.onclose = () => {
      showSnackbar('WebSocket connection closed', 'info');
    };

    return () => {
      ws.close();
    };
  }, [pair]);

  return { bids, asks, loading, error };
};
