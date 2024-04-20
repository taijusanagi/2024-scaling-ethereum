// import { expect } from "chai";
import hre from "hardhat";
import { encodeFunctionData } from "viem";

import { signProtocolAddress, signProtocolSchemaId } from "../constants";

describe("DeleGateWallet", function () {
  it("Integration", async function () {
    const attestationOwner = "0xab95e42096Ef6C18eD278f4FcA25754c96E60aae";
    console.log("attestationOwner", attestationOwner);
    const [signer] = await hre.viem.getWalletClients();
    const [signerAddress] = await signer.getAddresses();
    console.log("signerAddress", signerAddress);
    const deleGateWallet = await hre.viem.deployContract("DeleGateWallet");
    const sample = await hre.viem.deployContract("Sample");
    await deleGateWallet.write.initialize([attestationOwner, signProtocolAddress, BigInt(signProtocolSchemaId)]);
    console.log("deleGateWallet", deleGateWallet.address);
    const attestation = await deleGateWallet.read.getAttestation([BigInt(56)]);
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

    const result = await deleGateWallet.write.execute([sample.address, data, BigInt(56)]);
    const publicClient = await hre.viem.getPublicClient();
    const reciept = await publicClient.getTransactionReceipt({ hash: result });
    console.log("reciept", reciept);
  });
});
