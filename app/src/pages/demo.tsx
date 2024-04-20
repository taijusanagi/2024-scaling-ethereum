import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [deleGateWalletOwnerAddress, setDeleGateWalletOwnerAddress] = useState("");
  const [deleGateWalletAddress, setDeleGateWalletAddress] = useState("");
  const [attestations, setAttestations] = useState([]);

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
        <form className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Schema ID
            </label>
            <input
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value="onchain_evm_421614_0x2c"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              DeleGate Wallet Owner Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={deleGateWalletAddress}
              onChange={(e) => setDeleGateWalletAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Sample Contract Address
            </label>
            <input
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value="0x61461954"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Sample Function Signature
            </label>
            <input
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value="0x61461954"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attestation">
              Your Attestation
            </label>
            <select
              id="attestation"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Select Attestation</option>
              {attestations.map((attestation, i) => {
                return (
                  <option key={i} value={attestation}>
                    {attestation}
                  </option>
                );
              })}
            </select>

            <p className="mt-4 text-sm font-medium text-purple-600 text-right">
              <a href="https://app.sign.global/attest" className="underline" target="_blank">
                Create an attestation
              </a>
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Test
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
