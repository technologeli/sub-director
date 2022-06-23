import Shell from "@/components/shell";
import { trpc } from "@/utils/trpc";
import { zSubDirectory } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const CreateSubDirectory: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const mutation = trpc.useMutation(["subdirectories"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zSubDirectory),
  });

  if (status === "unauthenticated") router.push("/");

  return (
    <Shell subtitle="Create Sub Directory">
      <form
        className="bg-zinc-300 p-2"
        onSubmit={handleSubmit((d) => {
          console.log(/[^A-Za-z0-9\-]+/g.test(d.name as string));
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
        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
      </form>
    </Shell>
  );
};

export default CreateSubDirectory;
