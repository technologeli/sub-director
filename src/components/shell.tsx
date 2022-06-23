import Head from "next/head";
import Main from "@/components/main";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";

type ShellProps = React.ComponentProps<"div"> & {
  subtitle?: string;
  noNavbar?: boolean;
};

const Shell: React.FC<ShellProps> = ({
  subtitle,
  noNavbar,
  children,
  ...props
}) => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Sub Directory{subtitle && ` | ${subtitle}`}</title>
      </Head>
      <Main>
        <Header />
        {status === "loading" ? (
          <img src="/rings.svg" />
        ) : (
          <div className="flex flex-grow">
            {!noNavbar && status === "authenticated" && <Navbar />}
            <div {...props}>{children}</div>
          </div>
        )}
      </Main>
    </>
  );
};

export default Shell;
