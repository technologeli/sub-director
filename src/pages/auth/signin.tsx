import Main from "@/components/main";
import { GetServerSideProps, NextPage } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

type Providers = ReturnType<typeof getProviders>;

const Icon: React.FC<{ name: string }> = ({ name }) => {
  if (name === "GitHub") return <BsGithub size={32} />;
  return null;
};

const ProviderButton: React.FC<{ provider: Provider }> = ({ provider }) => {
  return (
    <div className="flex justify-center" key={provider.name}>
      <button
        className="flex justify-center items-center space-x-4
                bg-zinc-50 shadow-md rounded px-4 py-2
                hover:bg-zinc-200 transition-colors"
        onClick={() => signIn(provider.id, { callbackUrl: "/" })}
      >
        <Icon name={provider.name} />
        <span>Sign in with {provider.name}</span>
      </button>
    </div>
  );
};

const SignIn: NextPage<{ providers: Providers }> = ({ providers }) => {
  return (
    <Main className="items-center justify-center">
      <div className="w-96">
        {providers &&
          Object.values(providers).map((provider: Provider) => (
            <ProviderButton provider={provider} />
          ))}
      </div>
    </Main>
  );
};
export default SignIn;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
