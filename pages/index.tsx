import React from "react";
import SearchBar from "../src/components/search-bar/search-bar";
import BackgroundCanvas from "../src/components/background-canvas/background-canvas";
import PreviewCardContainer from "../src/components/preview-card-container/preview-card-container";
import fs from "fs";
import path from "path";

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
      <BackgroundCanvas />
      <SearchBar />
      <PreviewCardContainer APIEndPoints={APIEndPoints} />
    </>
  );
};

export default Home;
