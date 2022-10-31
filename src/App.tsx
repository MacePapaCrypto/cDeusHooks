import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
  ConnectButton
} from '@rainbow-me/rainbowkit';

import {
  Chain,
  configureChains,
  createClient,
  useAccount,
  WagmiConfig,
} from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

// fantom chain
const fantomChain: Chain = {
  id      : 250,
  name    : 'Fantom',
  network : 'fantom',

  nativeCurrency : {
    name     : 'Fantom',
    symbol   : 'FTM',
    decimals : 18,
  },
  rpcUrls : {
    default : 'https://rpc.ankr.com/fantom/',
  },
  blockExplorers : {
    default : {
      url  : 'https://ftmscan.com/',
      name : 'FTMScan',
    },
  },
  testnet : false,
}

//create provider
const { chains, provider } = configureChains(
  [
    fantomChain
  ],
  [
    publicProvider(),
  ]
);

//connectors
const { connectors } = getDefaultWallets({
  chains,
  appName: 'fghost'
});

//create client
const wagmiClient = createClient({
  provider,
  connectors,
  autoConnect: true,
});

const queryClient = new QueryClient();

function App() {

  //const { totalAssetsString } = useTotalAssets();
  const { address, connector } = useAccount();
  console.log(connector);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider 
          chains={chains}
          theme={midnightTheme({
            accentColor: "white",
            accentColorForeground: "black",
            borderRadius: "none",
          })}
          modalSize="compact"
        >
          <div className="App">
            <ConnectButton/>
            <p>{address ? address : "Not Connected"}</p>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default App;
