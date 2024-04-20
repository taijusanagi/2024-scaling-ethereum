import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useMemo, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

import { useReadContract } from "wagmi";

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
  const [deleGateWalletOwnerAddress, setDeleGateWalletOwnerAddress] = useState(
    "0xab95e42096Ef6C18eD278f4FcA25754c96E60aae"
  );
  const [attestationId, setAttestationId] = useState("");

  const signer = useEthersSigner();

  const { data: predictDeterministicAddress } = useReadContract({
    abi: deleGateWalletFactoryArtifact.abi,
    address: deleGateWalletFactoryAddress,
    functionName: "predictDeterministicAddress",
    args: [deleGateWalletOwnerAddress, ethers.constants.HashZero],
  });

  const functionData = "0x61461954";

  let defaultSteps = [
    {
      name: "Deploy Wallet",
      description: "Deploy a new wallet contract with attestation-based role management",
      status: "upcoming",
    },
    {
      name: "Execute",
      description: "Execute a function in a sample contract with attestation",
      status: "upcoming",
    },
  ];

  const [steps, setSteps] = useState(defaultSteps);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                const result = [...defaultSteps];
                setSteps(result);
                setIsModalOpen(true);
                const provider = new ethers.providers.JsonRpcProvider(rpc);
                const code = await provider.getCode(predictDeterministicAddress as string);
                if (code === "0x") {
                  const factory = new ethers.Contract(
                    deleGateWalletFactoryAddress,
                    deleGateWalletFactoryArtifact.abi,
                    signer
                  );
                  result[0].status = "current";
                  setSteps([...result]);
                  const createDelegateWalletTx = await factory.createDelegateWallet(
                    deleGateWalletOwnerAddress,
                    signProtocolAddress,
                    signProtocolSchemaId,
                    ethers.constants.HashZero
                  );
                  console.log("createDelegateWalletTx.hash", createDelegateWalletTx.hash);
                  await createDelegateWalletTx.wait();
                }
                result[0].status = "complete";
                setSteps([...result]);
                const wallet = new ethers.Contract(
                  predictDeterministicAddress as string,
                  deleGateWalletArtifact.abi,
                  signer
                );
                result[1].status = "current";
                setSteps([...result]);
                const executeTx = await wallet.execute(sampleAddress, "0x61461954", Number(attestationId));
                console.log("executeTx.hash", executeTx.hash);
                result[1].status = "complete";
                setSteps([...result]);
                await executeTx.wait();
              }}
            >
              Test
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {" "}
            <div className="flex flex-col">
              {steps.map((step: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className={`flex items-center text-sm ${index !== steps.length - 1 ? "mb-2" : ""}`}>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        step.status === "complete"
                          ? "bg-green-500"
                          : step.status === "current"
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                    >
                      {step.status === "complete" ? (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </span>
                    <div className="ml-4">
                      <p className={`font-semibold ${step.status === "current" ? "text-blue-600" : "text-gray-900"}`}>
                        {step.name}
                      </p>
                      <p className={`text-xs ${step.status === "current" ? "text-blue-500" : "text-gray-500"}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="ml-4 pl-1">
                      <div className="h-full w-0.5 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none disabled:bg-purple-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
