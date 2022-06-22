import Header from "@/components/header";
import Main from "@/components/main";
import Navbar from "@/components/navbar";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
});

const CreateSubDirectory = () => {
  const mutation = trpc.useMutation(["subdirectories"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="bg-zinc-300 p-2"
      onSubmit={handleSubmit((d) => {
        mutation.mutate({ name: d.name as string });
      })}
    >
      <div className="flex space-x-4">
        <label htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input className="rounded px-2" type="text" {...register("name")} />
      </div>
      {errors.name?.message && (
        <p className="text-red-500">{errors.name?.message}</p>
      )}
      <button type="submit" disabled={mutation.isLoading}>
        Create
      </button>
      {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
    </form>
  );
};

const Dashboard: NextPage = () => {
  const { data: subDirs } = trpc.useQuery(["subdirectories"]);
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") router.push("/");

  return (
    <>
      <Head>
        <title>Sub Director | Dashboard</title>
      </Head>
      <Main>
        <Header />
        <div className="flex flex-grow">
          <Navbar />
          <div>
            <pre>{JSON.stringify(subDirs, null, 4)}</pre>
            <CreateSubDirectory />
          </div>
        </div>
      </Main>
    </>
  );
};

export default Dashboard;
