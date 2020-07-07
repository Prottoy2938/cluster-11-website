import React from "react";
import { render, cleanup } from "@testing-library/react";
import SearchBar from "../search-bar";
afterEach(cleanup);

const setHideTitle = (): void => {
  console.log("Placeholder function ");
};

test("should take and match snapshot", () => {
  const { asFragment } = render(<SearchBar setHideTitle={setHideTitle} />);
  expect(
    asFragment(<SearchBar setHideTitle={setHideTitle} />)
  ).toMatchSnapshot();
});
