import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import { TradingPairProvider } from './context/TradingPairContext';
import Layout from '@/components/Layout';
import { SnackbarProvider } from './context/SnackbarProvider';

export const metadata = {
  title: 'Crypto Orderbook',
  description: 'Real-time BTC-USD visualizations',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <TradingPairProvider>
            <SnackbarProvider>
              <Layout>{children}</Layout>
            </SnackbarProvider>
          </TradingPairProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
