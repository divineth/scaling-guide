import "@/styles/globals.css";
import Layout from "@/components/Layout";
import {
  Arbitrum,
  CoinbaseWalletConnector,
  DAppProvider,
  MetamaskConnector,
} from "@usedapp/core";
import { WalletConnectConnector } from "@usedapp/wallet-connect-connector";
import { BreadDappProvider } from "@/providers/BreadProvider/BreadDappProvider";

const config = {
  readOnlyChainId: Arbitrum.chainId,
  readOnlyUrls: {
    [Arbitrum.chainId]: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
  },
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
    walletConnect: new WalletConnectConnector({
      chainId: Arbitrum.chainId,
      rpc: {
        [Arbitrum.chainId]: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
      },
    }),
  },
  multicallVersion: 2,
  gasLimitBufferPercentage: 20,
  autoConnect: true,
  networks: [Arbitrum],
  noMetamaskDeactivate: true,
};

export default function App({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <BreadDappProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BreadDappProvider>
    </DAppProvider>
  );
}
