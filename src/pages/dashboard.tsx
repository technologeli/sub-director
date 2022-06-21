import Header from "@/components/header";
import Navbar from "@/components/navbar";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <main className="bg-zinc-50 h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <Navbar />
        <div>content</div>
      </div>
    </main>
  );
};

export default Dashboard;
