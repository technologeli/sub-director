import Shell from "@/components/shell";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const { data: subDirs } = trpc.useQuery(["sub.list"]);
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") router.push("/");

  return (
    <Shell subtitle="Dashboard">
      <pre>{JSON.stringify(subDirs, null, 4)}</pre>
    </Shell>
  );
};

export default Dashboard;
