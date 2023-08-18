import Head from "next/head";
// import { Boxes } from "../components/Boxes";
// import { Charts } from "../components/Charts";
// import { LeftWidget } from "../components/LeftWidget";

// import { RightWidget } from "../components/RightWidget";
// import { Sidebar } from "../components/Sidebar";
import { Todos } from "../components/Todos";
import { NavBar } from "../components/NavBar";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>E-comm. - Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen  w-screen ">
        <NavBar />
        <div className="h-[93.5vh] flex justify-center items-center space-x-1 overflow-hidden">
          <div className="side h-full w-auto p-2 md:w-[15%] hidden md:inline    sticky  top-0  overflow-hidden">
            {/* <Sidebar /> */}
          </div>
          <div className="main  flex-1 h-full  overflow-x-hidden overflow-y-scroll scroll-smooth">
            <div className="boxs">{/* <Boxes /> */}</div>
            <div className="rounded-xl m-2  md:m-5 ">
              {/* <Charts /> */}
              <div className="flex flex-col md:flex-row mt-8">
                {/* <LeftWidget />
                <RightWidget /> */}
              </div>
            </div>
            <div className="flex-1 p-5">
              <Todos />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
