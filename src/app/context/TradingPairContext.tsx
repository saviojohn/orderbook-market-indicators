'use client';

import { createContext, useState, useContext } from 'react';

const TradingPairContext = createContext<{
  pair: string;
  setPair: (p: string) => void;
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
