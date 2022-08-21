import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ASCII Mapper</title>
        <meta name="description" content="Make ASCII maps in the browser!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1>ASCII Mapper</h1>
      </main>
    </div>
  )
}

export default Home
