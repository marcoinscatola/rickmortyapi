import { Section } from "..";
import { expectVisible, render } from "@/test/test-utils";

describe("Section", () => {
  it("renders the children", () => {
    const { queryAllByText } = render(
      <Section>
        <div>Inner</div>
        <div>Inner</div>
      </Section>
    );
    queryAllByText(/Inner/).forEach(expectVisible);
    expect.assertions(2);
  });
});
