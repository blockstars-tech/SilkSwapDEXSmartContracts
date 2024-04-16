import "dotenv/config";

import { HardhatUserConfig } from "hardhat/types";
import apiKey from "./api.config";
import solidity from "./compilers.config";
import networks from "./network.config";

const config: HardhatUserConfig = {
  solidity,
  networks,
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey,
    customChains: [
      {
        network: "bahamut",
        chainId: 5165,
        urls: {
          apiURL: "https://ftnscan.com/api",
          browserURL: "https://www.ftnscan.com/",
        },
      },
    ],
  },
};

export default config;
