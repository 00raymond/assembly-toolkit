import Image from "next/image";
import { Inter } from "next/font/google";
import HexToDec from "@/components/conversions/hextodec";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={"w-screen h-screen flex flex-col justify-center items-center"}>
      <div>
          <HexToDec />
      </div>
    </main>
  );
}
