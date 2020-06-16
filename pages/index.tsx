import React from "react";
import SearchBar from "../src/components/search-bar/search-bar";
import BackgroundCanvas from "../src/components/background-canvas/background-canvas";

const Home: React.FC = () => {
  return (
    <>
      <BackgroundCanvas />
      <SearchBar />
    </>
  );
};

export default Home;
