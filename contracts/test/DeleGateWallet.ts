import { expect } from "chai";
import hre from "hardhat";
import { encodeFunctionData } from "viem";

import { signProtocolAddress, signProtocolSchemaId } from "../constants";

describe("DeleGateWallet", function () {
  it("Integration", async function () {
    const [signer] = await hre.viem.getWalletClients();
    const [signerAddress] = await signer.getAddresses();
    console.log("signerAddress", signerAddress);
    const deleGateWallet = await hre.viem.deployContract("DeleGateWallet");
    const sample = await hre.viem.deployContract("Sample");

    await deleGateWallet.write.initialize([signerAddress, signProtocolAddress, BigInt(signProtocolSchemaId)]);
    const attestation = await deleGateWallet.read.getAttestation([BigInt(52)]);
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
  });
});
