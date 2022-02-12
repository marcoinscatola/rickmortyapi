import { Header } from "..";
import { render } from "@/test/test-utils";

describe("Header", () => {
  it("renders the title", () => {
    const { queryByText } = render(<Header title="Test title"></Header>);
    expect(queryByText(/Test title/)).toBeVisible();
  });

  it("renders the title as a link", () => {
    const { queryByText } = render(<Header title="Test title"></Header>);
    expect(queryByText(/Test title/)?.getAttribute("href")).toBeTruthy();
  });
});
