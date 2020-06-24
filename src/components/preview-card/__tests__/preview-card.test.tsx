import React from "react";
import { render, cleanup } from "@testing-library/react";
import PreviewCard from "../preview-card";

afterEach(cleanup);

test("should take and match snapshot", () => {
  const { asFragment } = render(
    <PreviewCard
      title="App Name"
      description="Description here"
      image="/imageRecognition/imageRecognition.jpg"
      demoURL="https://cluster-11.github.io/image-recognition-mobileNet/"
    />
  );
  expect(
    asFragment(
      <PreviewCard
        title="App Name"
        description="Description here"
        image="/imageRecognition/imageRecognition.jpg"
        demoURL="https://cluster-11.github.io/image-recognition-mobileNet/"
      />
    )
  ).toMatchSnapshot();
});
