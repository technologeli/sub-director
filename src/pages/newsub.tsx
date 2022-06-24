import Button from "@/components/button";
import { Form, TextInput, ErrorText } from "@/components/form";
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
  const utils = trpc.useContext();

  const mutation = trpc.useMutation("sub.create", {
    onSuccess: () => {
      utils.invalidateQueries("sub.list");
    },
  });
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
      <div className="px-4 py-4">
        <Form
          onSubmit={handleSubmit((d) => {
            mutation.mutate({ name: d.name as string });
          })}
        >
          <h3 className="pt-2 text-center text-xl font-semibold">
            New Subdirectory
          </h3>
          <TextInput
            label="Name"
            aria-required
            name="name"
            register={register}
            error={errors.name}
          />
          <Button
            className="py-2 font-bold"
            type="submit"
            disabled={mutation.isLoading}
          >
            Create
          </Button>
          {mutation.error && <ErrorText>{mutation.error.message}</ErrorText>}
        </Form>
      </div>
    </Shell>
  );
};

export default CreateSubDirectory;
