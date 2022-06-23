import Shell from "@/components/shell";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SubDirectory: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { name } = router.query;
  if (status === "unauthenticated") router.push("/");

  return (
    <Shell subtitle={name as string}>
      <div>{name}</div>
    </Shell>
  );
};
export default SubDirectory;
