import DepthChart from "@/components/DepthChart";
import ImbalanceIndicator from "@/components/ImbalanceIndicator";
import OrderbookTable from "@/components/OrderbookTable";
import SpreadChart from "@/components/SpreadChart";
import { TradingPairProvider } from "./context/TradingPairContext";
import PairSelector from "@/components/PairSelector";


export default function Home() {
  return (
    <TradingPairProvider>
      <main style={{ padding: 20 }}>
        <PairSelector />
        <SpreadChart />
        <ImbalanceIndicator />
        <DepthChart />
        <OrderbookTable />
      </main>
    </TradingPairProvider>
  );
}
