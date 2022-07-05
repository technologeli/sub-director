import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/button";

const Header: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div
      className="flex items-center justify-between bg-zinc-50 px-8 
      py-4 shadow"
    >
      <h1 className="text-3xl font-bold">Sub Director</h1>
      <div className="flex items-center space-x-4">
        {session && session.user ? (
          <>
            <h2>{session.user.name}</h2>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </>
        ) : (
          <>
            <Link href="about">
              <span
                className="text-zinc-600 transition-colors 
            hover:cursor-pointer hover:text-zinc-900"
              >
                About
              </span>
            </Link>
            <button
              className="rounded bg-zinc-900 px-8 py-1
            text-zinc-200 transition-colors hover:bg-zinc-800"
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
