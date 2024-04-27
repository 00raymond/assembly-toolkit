import Image from "next/image";
import { Inter } from "next/font/google";
import Convert from "@/components/conversions/convert";
import ComplementConversion from "@/components/conversions/complement";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={"w-screen h-screen flex flex-col justify-center items-center space-y-3"}>
      <div className={"flex flex-col space-y-4"}>
          <Convert />
          <ComplementConversion />
      </div>
    </main>
  );
}
