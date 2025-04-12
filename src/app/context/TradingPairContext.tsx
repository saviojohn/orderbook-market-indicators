// app/context/TradingPairContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

const TradingPairContext = createContext<{
  pair: string;
  setPair: (pair: string) => void;
}>({
  pair: 'btcusdt',
  setPair: () => {},
});

export const TradingPairProvider = ({ children }: { children: React.ReactNode }) => {
  const [pair, setPair] = useState('btcusdt');
  return (
    <TradingPairContext.Provider value={{ pair, setPair }}>
      {children}
    </TradingPairContext.Provider>
  );
};

export const useTradingPair = () => useContext(TradingPairContext);
