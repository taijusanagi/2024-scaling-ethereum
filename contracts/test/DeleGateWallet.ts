// import { expect } from "chai";
import hre from "hardhat";
import { encodeFunctionData } from "viem";

import { signProtocolAddress, signProtocolSchemaId } from "../constants";
import { ethers } from "ethers";

describe("DeleGateWallet", function () {
  it("Integration", async function () {
    // must change to attester address
    const attestationOwner = "0xab95e42096Ef6C18eD278f4FcA25754c96E60aae";
    const attestationId = 57;

    console.log("attestationOwner", attestationOwner);
    const [signer] = await hre.viem.getWalletClients();
    const [signerAddress] = await signer.getAddresses();
    console.log("signerAddress", signerAddress);

    const deleGateWalletImplementation = await hre.viem.deployContract("DeleGateWallet");
    const deleGateWalletFactory = await hre.viem.deployContract("DeleGateWalletFactory", [
      deleGateWalletImplementation.address,
    ]);
    const sample = await hre.viem.deployContract("Sample");

    const deployedDeleGateWalletAddress = await deleGateWalletFactory.read.predictDeterministicAddress([
      ethers.constants.HashZero,
    ]);

    await deleGateWalletFactory.write.createDelegateWallet([
      attestationOwner,
      signProtocolAddress,
      BigInt(signProtocolSchemaId),
      ethers.constants.HashZero,
    ]);

    const deleGateWallet = await hre.viem.getContractAt("DeleGateWallet", deployedDeleGateWalletAddress);

    // must set this address as wallet in attestation
    console.log("deleGateWallet", deleGateWallet.address);
    const attestation = await deleGateWallet.read.getAttestation([BigInt(attestationId)]);
    console.log("attestation", attestation);

    const data = encodeFunctionData({
      abi: sample.abi,
      functionName: "execute",
      args: [],
    });

    const expectedFunctionSig = await sample.read.getFunctionSig();
    console.log("expectedFunctionSig", expectedFunctionSig);

    const functionSigFromData = await deleGateWallet.read.getFunctionSigFromData([data]);
    console.log("functionSigFromData", functionSigFromData);

    const result = await deleGateWallet.write.execute([sample.address, data, BigInt(attestationId)]);
    const publicClient = await hre.viem.getPublicClient();
    const reciept = await publicClient.getTransactionReceipt({ hash: result });
    console.log("reciept", reciept);
  });
});
