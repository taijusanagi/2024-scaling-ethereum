import hre from "hardhat";

async function main() {
  const deleGateWalletImplementation = await hre.viem.deployContract("DeleGateWallet");
  const deleGateWalletFactory = await hre.viem.deployContract("DeleGateWalletFactory", [
    deleGateWalletImplementation.address,
  ]);
  const sample = await hre.viem.deployContract("Sample");
  console.log("deleGateWalletImplementation", deleGateWalletImplementation.address);
  console.log("deleGateWalletFactory", deleGateWalletFactory.address);
  console.log("sample", sample.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
