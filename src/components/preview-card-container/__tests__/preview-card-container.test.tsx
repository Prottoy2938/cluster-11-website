import React from "react";
import { render, cleanup } from "@testing-library/react";
import PreviewCardContainer from "../preview-card-container";
afterEach(cleanup);

test("should take and match snapshot", () => {
  const { asFragment } = render(
    <PreviewCardContainer APIEndPoints={["placeholder", "text", "here"]} />
  );
  expect(
    asFragment(
      <PreviewCardContainer APIEndPoints={["placeholder", "text", "here"]} />
    )
  ).toMatchSnapshot();
});
