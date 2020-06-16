import React from "react";
import SearchBar from "../src/components/search-bar/search-bar";
import BouncingBallCanvas from "../src/components/bouncing-ball-canvas/bouncing-ball-canvas";

const Home: React.FC = () => {
  return (
    <>
      <BouncingBallCanvas />
      <SearchBar />
    </>
  );
};

export default Home;
