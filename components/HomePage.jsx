// this is the  home page...
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { Hero } from "./Hero";

const Favorites = dynamic(() => import("./Favorites"), { ssr: false });
const Banner = dynamic(() => import("./Banner"));

const Productes = dynamic(() => import("./Productes"));

export const HomePage = () => {
  return (
    <>
      <Head>
        <title>shopEasee - an shopping site</title>
      </Head>

      <Hero />
      <Favorites />
      <Banner image="/bg1.jpg" title="Premium Products For Men's." />
      <Productes />
      <Banner image="/bg2.jpg" title="Premium Products For Women's." />
      <Productes />
      <Banner image="/photo4.jpg" title="Premium Products For Kid's." />
      <Productes />
    </>
  );
};
