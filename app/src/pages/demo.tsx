import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`box-border flex relative flex-col shrink-0 min-h-screen bg-gradient-to-br from-gray-800 to-black ${inter.className}`}
    >
      <header className="flex justify-between items-center p-4 text-white">
        <h1 className="text-lg font-bold text-purple-600">DeleGate</h1>
        <ConnectButton />
      </header>
      <div className="flex-grow flex items-center justify-center">
        <form className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          {/* Form contents go here */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
