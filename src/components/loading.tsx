import Head from "next/head";
import Image from "next/image";
import Main from "@/components/main";
import Header from "@/components/header";

const Loading = () => {
  return (
    <>
      <Head>
        <title>Sub Directory | Loading...</title>
      </Head>
      <Main>
        <Header />
        <Image src="/rings.svg" layout="fill" />
      </Main>
    </>
  );
};

export default Loading;
