import Main from "@/components/main";
import { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

type Providers = ReturnType<typeof getProviders>;

const Icon: React.FC<{ name: string }> = ({ name }) => {
  if (name === "GitHub") return <BsGithub />;
  return null;
};

const SignIn = ({ providers }: { providers: Providers }) => {
  return (
    <Main className="items-center justify-center">
      <div className="bg-orange-200 w-96 h-96">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="flex items-center space-x-8 bg-pink-500"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                <Icon name={provider.name} /> Sign in with {provider.name}
              </button>
            </div>
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
