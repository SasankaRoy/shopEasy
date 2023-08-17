import Head from "next/head";
import { HomePage } from "../components/HomePage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>shopEasee</title>
        <meta
          name="description"
          content="It is a shopping app that provides best quality products at a affodable price at your door step."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <HomePage />
      </div>
    </div>
  );
}
