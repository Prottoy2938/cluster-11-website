import React from "react";
import { render, cleanup } from "@testing-library/react";
import BackgroundCanvas from "../background-canvas";

afterEach(cleanup);

test("should take a snapshot", () => {
  const { asFragment } = render(<BackgroundCanvas />);
  expect(asFragment(<BackgroundCanvas />)).toMatchSnapshot();
});
