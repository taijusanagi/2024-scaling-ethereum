import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useMemo, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

import { useReadContract, useWriteContract, useAccount, usePublicClient } from "wagmi";

import deleGateWalletFactoryArtifact from "@/lib/artifacts/DeleGateWalletFactory.json";
import deleGateWalletArtifact from "@/lib/artifacts/DeleGateWallet.json";

import {
  deleGateWalletFactoryAddress,
  sampleAddress,
  rpc,
  signProtocolAddress,
  signProtocolSchemaId,
} from "@/lib/constants";
import { ethers } from "ethers";
import { useEthersSigner } from "@/hooks/useEthersSigner";

export default function Home() {
  const [deleGateWalletOwnerAddress, setDeleGateWalletOwnerAddress] = useState("");
  const [attestationId, setAttestationId] = useState("");

  const signer = useEthersSigner();

  const { data: predictDeterministicAddress } = useReadContract({
    abi: deleGateWalletFactoryArtifact.abi,
    address: deleGateWalletFactoryAddress,
    functionName: "predictDeterministicAddress",
    args: [deleGateWalletOwnerAddress, ethers.constants.HashZero],
  });

  const functionData = "0x61461954";

  const publicClient = usePublicClient();

  return (
    <main
      className={`box-border flex relative flex-col shrink-0 min-h-screen bg-gradient-to-br from-gray-800 to-black ${inter.className}`}
    >
      <header className="flex justify-between items-center p-4 text-white">
        <Link href="/">
          <h1 className="text-lg font-bold text-purple-600">DeleGate</h1>
        </Link>
        <ConnectButton />
      </header>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg m-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Schema ID
            </label>
            <input
              disabled
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value="onchain_evm_421614_0x2c"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              DeleGate Wallet Owner Address
            </label>
            <input
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={deleGateWalletOwnerAddress}
              onChange={(e) => setDeleGateWalletOwnerAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              DeleGate Wallet Address
            </label>
            <input
              disabled
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={(predictDeterministicAddress as string) || ""}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Sample Contract Address
            </label>
            <input
              disabled
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={sampleAddress}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Sample Function Signature
            </label>
            <input
              disabled
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={functionData}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Attestation Id
            </label>
            <input
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={attestationId}
              onChange={(e) => setAttestationId(e.target.value)}
            />

            <p className="mt-4 text-sm font-medium text-purple-600">
              <a href="https://app.sign.global/attest" className="underline" target="_blank">
                Create an attestation
              </a>
            </p>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              disabled={!predictDeterministicAddress || !signer}
              className="bg-purple-600 hover:bg-purple-800 disabled:hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={async () => {
                const provider = new ethers.providers.JsonRpcProvider(rpc);
                const code = await provider.getCode(deleGateWalletOwnerAddress);
                if (code === "0x") {
                  const factory = new ethers.Contract(
                    deleGateWalletFactoryAddress,
                    deleGateWalletFactoryArtifact.abi,
                    signer
                  );
                  const createDelegateWalletTx = await factory.createDelegateWallet(
                    deleGateWalletOwnerAddress,
                    signProtocolAddress,
                    signProtocolSchemaId,
                    ethers.constants.HashZero
                  );
                  console.log("createDelegateWalletTx.hash", createDelegateWalletTx.hash);
                  await createDelegateWalletTx.wait();
                }
                const wallet = new ethers.Contract(deleGateWalletOwnerAddress, deleGateWalletArtifact.abi, signer);
                const executeTx = await wallet.execute(sampleAddress, "0x61461954", attestationId);
                console.log("executeTx.hash", executeTx.hash);
                await executeTx.wait();
              }}
            >
              Test
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
