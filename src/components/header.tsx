import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div
      className="px-8 py-4 flex items-center justify-between 
      bg-zinc-50 shadow"
    >
      <h1 className="text-3xl font-bold">Sub Director</h1>
      <div className="flex items-center space-x-4">
        {session && session.user ? (
          <>
            <h2>{session.user.name}</h2>
            <button
              className="px-8 py-1 rounded text-zinc-200
            bg-zinc-900 hover:bg-zinc-800 transition-colors"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="about">
              <span
                className="text-zinc-600 transition-colors 
            hover:text-zinc-900 hover:cursor-pointer"
              >
                About
              </span>
            </Link>
            <button
              className="px-8 py-1 rounded text-zinc-200
            bg-zinc-900 hover:bg-zinc-800 transition-colors"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
