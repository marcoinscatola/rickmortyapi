import { UnknownLocation } from "..";
import { expectVisible, render } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";

describe("UnknownLocation", () => {
  it("renders the provided location data ", () => {
    const { queryByText, queryAllByText } = render(<UnknownLocation />, {
      preloadedState: STORE_FIXTURES.state,
    });
    queryAllByText("Unknown").forEach(expectVisible);
    expect(queryByText(0)).toBeVisible();
    expect.assertions(4);
  });
});
