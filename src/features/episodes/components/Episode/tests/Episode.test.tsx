import { Episode } from "..";
import { render } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";

describe("Episode", () => {
  it("renders the episode title", () => {
    const { queryByText } = render(<Episode id="1" />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(queryByText(/Pilot/)).toBeVisible();
  });

  it("renders the episode season and number", () => {
    const { queryByText } = render(<Episode id="1" />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(queryByText(/S01E01/)).toBeVisible();
  });
});
