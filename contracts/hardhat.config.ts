import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";

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
      url: "https://public.stackup.sh/api/v1/node/arbitrum-sepolia",
      accounts,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 100000,
  },
};

export default config;
