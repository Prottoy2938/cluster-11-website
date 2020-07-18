import React from "react";
import BackgroundCanvas from "../src/components/background-canvas/background-canvas";
import PreviewCardContainer from "../src/components/preview-card-container/preview-card-container";
import fs from "fs";
import path from "path";
import Head from "next/head";
import AppBar from "../src/components/app-bar/app-bar";

export async function getServerSideProps(): Promise<any> {
  const apiDirectory = path.join(process.cwd(), "/pages/api");
  const filenames = fs.readdirSync(apiDirectory);

  //finding every available api in `/pages/api`
  const APIEndPoints = filenames.map((filename) =>
    filename.replace(/\.js$/, "")
  );
  return {
    props: {
      APIEndPoints,
    },
  };
}

interface Props {
  APIEndPoints: string[];
}

const Home: React.FC<Props> = (props: Props) => {
  const { APIEndPoints } = props;

  return (
    <>
      <Head>
        <title>Cluster 11 | Cluster of AI/ML Powered Application</title>

        <meta
          property="og:title"
          content="Cluster 11 | Cluster of AI/ML Powered Application"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://i.ibb.co/vPzHzTY/Cluster-11-SEO-Image.png"
        />
        <meta
          property="og:description"
          content="A GitHub organization which creates open-source starter/boilerplate web applications that uses AI and machine learning."
        />
        <meta property="og:url" content="https://cluster-11.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <BackgroundCanvas />
      <AppBar backgroundColor="rgba(22, 22, 22, 1)" />
      <PreviewCardContainer APIEndPoints={APIEndPoints} />
    </>
  );
};

export default Home;
