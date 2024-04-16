import { SolidityUserConfig } from "hardhat/types";

const solidity: SolidityUserConfig = {
  compilers: [
    {
      version: "0.6.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 201,
        },
      },
    },
    {
      version: "0.5.16",
      settings: {
        optimizer: {
          enabled: true,
          runs: 201,
        },
      },
    },
    {
      version: "0.4.18",
      settings: {
        optimizer: {
          enabled: true,
          runs: 201,
        },
      },
    },
  ],
};

export default solidity;
