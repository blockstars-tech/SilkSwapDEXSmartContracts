import "dotenv/config";

let apiKey: Record<string, string> | string = {};

if (process.env.ANY_NETWORK_API_KEY) {
  apiKey = process.env.ANY_NETWORK_API_KEY;
} else {
  if (process.env.ETHERSCAN_API_KEY) {
    apiKey.mainnet = process.env.ETHERSCAN_API_KEY;
    apiKey.ropsten = process.env.ETHERSCAN_API_KEY;
    apiKey.rinkeby = process.env.ETHERSCAN_API_KEY;
    apiKey.goerli = process.env.ETHERSCAN_API_KEY;
    apiKey.kovan = process.env.ETHERSCAN_API_KEY;
    apiKey.sepolia = process.env.ETHERSCAN_API_KEY;
  }
  if (process.env.BSC_API_KEY) {
    apiKey.bscTestnet = process.env.BSC_API_KEY;
    apiKey.bsc = process.env.BSC_API_KEY;
  }
  if (process.env.POLYGON_API_KEY) {
    apiKey.polygonMumbai = process.env.POLYGON_API_KEY;
    apiKey.polygon = process.env.POLYGON_API_KEY;
  }
  if (process.env.FTM_API_KEY) {
    apiKey.opera = process.env.FTM_API_KEY;
    apiKey.ftmTestnet = process.env.FTM_API_KEY;
  }
  if (process.env.OPTIMISTIC_API_KEY) {
    apiKey.optimisticEthereum = process.env.OPTIMISTIC_API_KEY;
    apiKey.optimisticKovan = process.env.OPTIMISTIC_API_KEY;
  }
  if (process.env.ARBITRUM_API_KEY) {
    apiKey.arbitrumOne = process.env.ARBITRUM_API_KEY;
    apiKey.arbitrumTestnet = process.env.ARBITRUM_API_KEY;
  }
  if (process.env.AVALANCHE_API_KEY) {
    apiKey.avalanche = process.env.AVALANCHE_API_KEY;
    apiKey.avalancheFujiTestnet = process.env.AVALANCHE_API_KEY;
  }
  apiKey.bahamut = "abc";
}

export default apiKey;
