import Head from "next/head";
import Main from "@/components/main";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading";

type ShellProps = React.ComponentProps<"div"> & {
  subtitle?: string;
  noNavbar?: boolean;
  loading?: boolean;
};

const Shell: React.FC<ShellProps> = ({
  subtitle,
  noNavbar,
  loading,
  children,
  ...props
}) => {
  const { status } = useSession();

  if (status === "loading" || loading) return <Loading />;

  return (
    <>
      <Head>
        <title>Sub Directory{subtitle && ` | ${subtitle}`}</title>
      </Head>
      <Main>
        <Header />
        <div className="flex flex-grow">
          {!noNavbar && status === "authenticated" && <Navbar />}
          <div className="flex-grow" {...props}>
            {children}
          </div>
        </div>
      </Main>
    </>
  );
};

export default Shell;
