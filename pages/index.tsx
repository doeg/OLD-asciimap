import type { NextPage } from "next";
import Head from "next/head";
import { MapCanvas } from "../components/MapCanvas";
import { MapsContextProvider } from "../contexts/maps-context";

const Home: NextPage = () => {
  return (
    <MapsContextProvider>
      <div>
        <Head>
          <title>ASCII Mapper</title>
          <meta name="description" content="Make ASCII maps in the browser!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="text-center">
          <h1>ASCII Mapper</h1>
          <MapCanvas />
        </main>
      </div>
    </MapsContextProvider>
  );
};

export default Home;
