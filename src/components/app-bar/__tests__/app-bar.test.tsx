import React from "react";
import { render, cleanup } from "@testing-library/react";
import AppBar from "../app-bar";
afterEach(cleanup);

test("should take and match snapshot", () => {
  const { asFragment } = render(<AppBar />);
  expect(asFragment(<AppBar />)).toMatchSnapshot();
});
