import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/button";

const Header: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div
      className="z-10 flex items-center justify-between bg-brand-fill px-8 
      py-4 shadow-md"
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
                className="text-brand-fill-inverted transition-colors 
            hover:cursor-pointer hover:text-opacity-80"
              >
                About
              </span>
            </Link>
            <Button onClick={() => signIn()}>Sign In</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
