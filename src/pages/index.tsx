import Header from "@/components/header";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <main className="bg-zinc-50 h-screen w-screen">
        <Header />
      </main>
    </>
  );
};

export default Home;
