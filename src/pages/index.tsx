import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <main className="mx-4 my-4">
        <div>Signed in as {session.user.email}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </main>
    );
  }

  return (
    <main className="mx-4 my-4">
      <div>Not signed in</div>
      <button onClick={() => signIn()}>Sign in</button>
    </main>
  );
};

export default Home;
