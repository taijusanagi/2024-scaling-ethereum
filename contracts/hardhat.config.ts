import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const accounts = [process.env.PRIVATE_KEY || ""];

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public",
      },
    },
    arbitrum: {
      url: "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public",
      accounts,
    },
  },
  mocha: {
    timeout: 100000,
  },
};

export default config;
