import { SubHeading } from "..";
import { expectVisible, render } from "@/test/test-utils";

describe("SubHeading", () => {
  it("renders the text", () => {
    const { queryByText } = render(<SubHeading>Heading</SubHeading>);
    expect(queryByText(/Heading/)).toBeVisible();
  });
});
