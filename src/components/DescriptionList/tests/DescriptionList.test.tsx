import {
  DescriptionList,
  DescriptionDetails,
  DescriptionTerm,
  DescriptionSection,
} from "..";
import { expectVisible, render } from "@/test/test-utils";

const TestDL = (
  <DescriptionList>
    <DescriptionSection>
      <DescriptionTerm>Term 1</DescriptionTerm>
      <DescriptionDetails>Definition 1</DescriptionDetails>
    </DescriptionSection>
    <DescriptionSection>
      <DescriptionTerm>Term 2</DescriptionTerm>
      <DescriptionDetails>Definition 2</DescriptionDetails>
    </DescriptionSection>
  </DescriptionList>
);

describe("DescriptionList", () => {
  it("renders a `dl` tag", () => {
    const { container } = render(TestDL);
    expect(container.querySelector("dl")).not.toBeNull();
  });

  it("renders multiple `dt` tags", () => {
    const { container } = render(TestDL);
    container.querySelectorAll("dt").forEach(expectVisible);
    expect.assertions(2);
  });

  it("renders multiple `dd` tags", () => {
    const { container } = render(TestDL);
    container.querySelectorAll("dd").forEach(expectVisible);
    expect.assertions(2);
  });

  it("renders the terms", () => {
    const { queryAllByText } = render(TestDL);
    queryAllByText(/Term/).forEach(expectVisible);
    expect.assertions(2);
  });

  it("renders the terms definitions", () => {
    const { queryAllByText } = render(TestDL);
    queryAllByText(/Definition/).forEach(expectVisible);
    expect.assertions(2);
  });
});
