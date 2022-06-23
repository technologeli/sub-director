import Shell from "@/components/shell";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
});

const CreateSubDirectory: NextPage = () => {
  const { data: subDirs } = trpc.useQuery(["subdirectories"]);
  const { status } = useSession();
  const router = useRouter();

  const mutation = trpc.useMutation(["subdirectories"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  if (status === "unauthenticated") router.push("/");

  return (
    <Shell subtitle="Create Sub Directory">
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
        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
      </form>
    </Shell>
  );
};

export default CreateSubDirectory;
