import React from "react";
import SearchBar from "../src/components/search-bar/search-bar";
import BackgroundCanvas from "../src/components/background-canvas/background-canvas";
import PreviewCard from "../src/components/preview-card/preview-card";

const Home: React.FC = () => {
  return (
    <>
      <BackgroundCanvas />
      <SearchBar />
      <PreviewCard />
    </>
  );
};

export default Home;
