import Header from "@/components/header";
import Main from "@/components/main";
import Navbar from "@/components/navbar";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const { data: secretData } = trpc.useQuery(["secret"]);
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <Main>
      <Header />
      <div className="flex flex-grow">
        <Navbar />
        <pre>{JSON.stringify(secretData, null, 4)}</pre>
      </div>
    </Main>
  );
};

export default Dashboard;
