import type { NextPage } from "next";
import Head from "next/head";
import { Workspace } from "../components/Workspace";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ASCII Mapper</title>
        <meta name="description" content="Make ASCII maps in the browser!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Workspace />
    </div>
  );
};

export default Home;
