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
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <BackgroundCanvas />
      <AppBar />
      <PreviewCardContainer APIEndPoints={APIEndPoints} />
    </>
  );
};

export default Home;
