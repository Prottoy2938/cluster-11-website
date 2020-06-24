import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import SearchBar from "../search-bar";

afterEach(cleanup);

test("should take and match snapshot", () => {
  const { asFragment } = render(<SearchBar />);
  expect(asFragment(<SearchBar />)).toMatchSnapshot();
});

//this test will fail unless you give the search id and key to run the test. I can't make react-testing-library to access my my .env file.
//If you can't access your process.env data then you can do a workaround. Pass the value of `searchID` and `searchKey` when you run `npm run test` from the command line.
//like this
//$ searchID="you search key" searchKey="your search id" npm run test

//TODO:   UNUSED TEST, HAVE TO EDIT THIS
// test("Shows search suggestions", async () => {
//   const { getByTestId } = render(<SearchBar />);
//   const input = getByTestId("search-field");
//   fireEvent.change(input, { target: { value: "chic" } });
//   const suggestions = await waitForElement(() => getByTestId("1"));
//   expect(suggestions).toHaveTextContent("Chicken Pho");
// });

//theres something wrong with this test, I can't figure it out
test("Remove search query onFocus and back space key", () => {
  const { getByTestId } = render(<SearchBar />);
  const input = getByTestId("search-field");
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: "Backspace", code: "Backspace" });
  expect(input).toHaveTextContent("");
});
