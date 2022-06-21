import { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";

type Providers = ReturnType<typeof getProviders>;

const SignIn = ({ providers }: { providers: Providers }) => {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </>
  );
};
export default SignIn;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
