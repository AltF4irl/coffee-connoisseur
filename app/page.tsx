import Banner from "@/components/banner.client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Banner />
      <h2 className="font-inter">Git fucking Gud</h2>
    </main>
  );
}
