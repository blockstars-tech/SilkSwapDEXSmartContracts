import {
  HardhatNetworkForkingUserConfig,
  NetworksUserConfig,
  NetworkUserConfig,
} from "hardhat/types";
import pks from "./pk.config";

let forking: HardhatNetworkForkingUserConfig | undefined;
if (process.env.FORKING_RPC) {
  forking = {
    url: process.env.FORKING_RPC,
  };
}

const networks: NetworksUserConfig = {};

networks.hardhat = {
  forking,
  accounts: {
    mnemonic: "test test test test test test test test test test test junk",
    count: 25,
    accountsBalance: "100000000000000000000000000",
  },
};
networks.anyNetwork = getNetworkObject(process.env.ANY_NETWORK_RPC);
networks.mainnet = getNetworkObject(process.env.MAINNET_RPC, 1);
networks.ropsten = getNetworkObject(process.env.ROPSTEN_RPC, 3);
networks.rinkeby = getNetworkObject(process.env.RINKEBY_RPC, 4);
networks.goerli = getNetworkObject(process.env.GOERLI_RPC, 5);
networks.kovan = getNetworkObject(process.env.KOVAN_RPC, 42);
networks.sepolia = getNetworkObject(process.env.SEPOLIA_RPC, 11155111);
networks.bsc = getNetworkObject(process.env.BSC_RPC || "https://bsc-dataseed.binance.org/", 56);
networks.bscTestnet = getNetworkObject(
  process.env.BSC_TESTNET_RPC || "https://data-seed-prebsc-1-s1.binance.org:8545/",
  97
);
networks.fantom = getNetworkObject(process.env.FTM_RPC || "https://rpcapi.fantom.network/", 250);
networks.fantomTestnet = getNetworkObject(
  process.env.FTM_TESTNET_RPC || "https://rpc.testnet.fantom.network/",
  4002
);
networks.optimistic = getNetworkObject(
  process.env.OPTIMISTIC_RPC || "https://mainnet.optimism.io/",
  10
);
networks.optimisticTestnet = getNetworkObject(
  process.env.OPTIMISTIC_TESTNET_RPC || "https://kovan.optimism.io/",
  69
);
networks.polygon = getNetworkObject(process.env.POLYGON_RPC || "https://polygon-rpc.com/", 137);
networks.polygonTestnet = getNetworkObject(
  process.env.POLYGON_TESTNET_RPC || "https://matic-mumbai.chainstacklabs.com",
  80001
);
networks.arbitrum = getNetworkObject(
  process.env.ARBITRUM_RPC || "https://arb1.arbitrum.io/rpc/",
  42161
);
networks.arbitrumTestnet = getNetworkObject(
  process.env.ARBITRUM_TESTNET_RPC || "https://rinkeby.arbitrum.io/rpc/",
  421611
);
networks.avalanche = getNetworkObject(
  process.env.AVALANCHE_RPC || "https://api.avax.network/ext/bc/C/rpc/",
  43114
);
networks.avalancheTestnet = getNetworkObject(
  process.env.AVALANCHE_TESTNET_RPC || "https://api.avax-test.network/ext/bc/C/rpc/",
  43113
);

networks.bahamut = {
  url: "https://bahamut-rpc.publicnode.com",
  chainId: 5165,
  accounts: pks,
};

export default networks;

function getNetworkObject(url?: string, chainId?: number): NetworkUserConfig {
  if (!url) {
    url = "";
    chainId = undefined;
  }
  return {
    url,
    chainId,
    accounts: pks,
  };
}
