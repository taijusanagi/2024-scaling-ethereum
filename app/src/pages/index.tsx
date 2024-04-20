import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`box-border flex relative flex-col shrink-0 bg-gradient-to-br from-gray-800 to-black ${inter.className}`}
    >
      <header className="flex justify-between items-center p-4 text-white">
        <Link href="/">
          <h1 className="text-lg font-bold text-purple-600">DeleGate</h1>
        </Link>
        <ConnectButton />
      </header>

      <div className="box-border flex relative flex-col shrink-0">
        <div className="box-border flex relative flex-col shrink-0">
          <div className="flex flex-col p-20 mt-20 w-full max-md:px-5 max-md:max-w-full">
            <div className="text-7xl font-extrabold text-center text-purple-600 leading-[79.2px] max-md:max-w-full max-md:text-4xl">
              DeleGate
            </div>
            <div className="mt-8 text-xl leading-7 text-center text-white max-md:max-w-full">
              DeleGate is a smart contract wallet with attestation-based role management.
            </div>
            <div className="flex gap-4 justify-center self-center mt-8 text-xl font-medium tracking-wide leading-6 text-white">
              <Link href="/demo">
                <div className="justify-center p-4 bg-purple-600 rounded-lg border-2 border-purple-600 border-solid max-md:px-5">
                  Demo
                </div>
              </Link>
            </div>
            <div className="flex flex-col self-center mt-20 w-full bg-white rounded-3xl shadow-2xl max-w-[1100px] max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 justify-between px-4 py-2 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-1.5 my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5bf13955a4a785e76c7130ab4e933e893ff39726c3bba11b4fbfa09ae21a81f?apiKey=5b267050b6bf44e5a34a2a79f0903d25&"
                    className="shrink-0 w-2.5 aspect-square"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c272f13400f224093125ce106e1a635ec314e2bb975b0e90704b07c999c0290f?apiKey=5b267050b6bf44e5a34a2a79f0903d25&"
                    className="shrink-0 w-2.5 aspect-square"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/20a5792d2bc5ad6605d1e311075b1884c2581ba932a461e26f3ea772950b8453?apiKey=5b267050b6bf44e5a34a2a79f0903d25&"
                    className="shrink-0 w-2.5 aspect-square"
                  />
                </div>
                <div className="flex gap-0 max-md:flex-wrap max-md:max-w-full">
                  <div className="justify-center items-center px-2 py-1 text-xs leading-4 whitespace-nowrap rounded-md bg-slate-100 text-slate-400 max-md:px-5 max-md:max-w-full">
                    app.delegate.io
                  </div>
                  <div className="flex flex-1 gap-1.5 self-start pl-20 max-md:flex-wrap">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/76c2808ada1cf2fd2682bfec55afb559031c44fee178cc9fc13055a40756310e?apiKey=5b267050b6bf44e5a34a2a79f0903d25&"
                      className="shrink-0 w-6 aspect-square"
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/313e022937f244c70075e66c304614c48f74ccf8064d3619c81c92a99dbef595?apiKey=5b267050b6bf44e5a34a2a79f0903d25&"
                      className="shrink-0 w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
              <img loading="lazy" src="/screen.png" className="w-full max-md:max-w-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-20 w-full text-white leading-[110%] max-md:px-5 max-md:max-w-full">
          <div className="text-6xl font-extrabold text-center max-md:max-w-full max-md:text-4xl">Powered By</div>
          <div className="flex justify-center items-center px-16 mt-20 text-2xl font-bold max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-w-xl max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-4 justify-center whitespace-nowrap">
                <img loading="lazy" src="/arbitrum.png" className="shrink-0 aspect-[1.03] w-[33px]" />
                <div className="my-auto">Arbitrum</div>
              </div>
              <div className="flex gap-4 justify-center whitespace-nowrap">
                <img loading="lazy" src="/sign-protocol.svg" className="shrink-0 w-8 aspect-square fill-white" />
                <div className="my-auto">Sign Protocol</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-20 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[38%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto text-white max-md:mt-10 max-md:max-w-full">
              <div className="text-xl font-bold leading-5 uppercase tracking-[3px] max-md:max-w-full">ROLE WITH</div>
              <div className="mt-4 text-6xl font-extrabold leading-[62px] max-md:max-w-full max-md:text-4xl max-md:leading-[50px]">
                Attestations
              </div>
              <div className="mt-8 text-lg leading-7 max-md:max-w-full">
                DeleGate utilizes the Sign Protocol&apos;s attestation to manage the roles of smart contract wallets.
                Only accounts with attestation can execute certain functions.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="/how-it-work.png"
              className="grow w-full shadow-xl max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
      <div className="p-20 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center mt-1 text-xl text-white max-md:mt-10 max-md:max-w-full">
              <div className="font-bold uppercase leading-[100%] tracking-[3px] max-md:max-w-full">Benefit</div>
              <div className="mt-4 text-7xl font-extrabold leading-[79px] max-md:max-w-full max-md:text-4xl max-md:leading-[49px]">
                <span className="text-purple-400">Transparent</span> role management
              </div>
              <div className="mt-8 text-lg leading-7 max-md:max-w-full">
                DeleGate enhances decentralized team management and operations with secure, role-based access and full
                transparency. It automates critical wallet operations, streamlining processes and ensuring all actions
                are traceable and verifiable.{" "}
              </div>
              <div className="flex gap-4 justify-center self-start py-4 mt-8 font-medium tracking-wide rounded-lg leading-[120%]">
                <Link href="/demo">
                  <div className="justify-center p-4 bg-purple-600 rounded-lg border-2 border-purple-600 border-solid max-md:px-5">
                    Demo
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/47a754d4d35c860492f3bd4ccddb91f0e5a110bc275f687e54f94b5111ce70ed?apiKey=5b267050b6bf44e5a34a2a79f0903d25&"
              className="grow w-full aspect-[0.99] max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
