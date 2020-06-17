import React from "react";
import BackgroundCanvas from "../background-canvas";
import renderer from "react-test-renderer";

function createNodeMock(element) {
  if (element.type === "input") {
    return {
      focus() {},
    };
  }
  return null;
}

it("renders correctly", () => {
  const options = { createNodeMock };
  const tree = renderer.create(<BackgroundCanvas />, options);
  expect(tree).toMatchSnapshot();
});
