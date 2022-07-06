import { Form } from "@/components/form";
import Shell from "@/components/shell";
import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SubDirectory: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { name } = router.query;
  const {
    data: subDir,
    isLoading,
    error,
  } = trpc.useQuery(["sub.get", { name: name as string }]);
  if (status === "unauthenticated") router.push("/");

  if (!subDir || error) return <p>error?.message</p>;

  return (
    <Shell loading={isLoading} subtitle={name as string}>
      <div className="flex justify-center">
        <div className="max-w-3xl flex-grow px-4 py-4">
          <Form>
            <h3>{subDir.subDirectory.name}</h3>
          </Form>
        </div>
      </div>
      <pre>{JSON.stringify(subDir, null, 4)}</pre>
    </Shell>
  );
};
export default SubDirectory;
