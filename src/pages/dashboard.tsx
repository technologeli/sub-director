import Header from "@/components/header";
import Main from "@/components/main";
import Navbar from "@/components/navbar";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <Main>
      <Header />
      <div className="flex flex-grow">
        <Navbar />
        <div>content</div>
      </div>
    </Main>
  );
};

export default Dashboard;
