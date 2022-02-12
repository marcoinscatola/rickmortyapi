import { EpisodesList } from "..";
import { render } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";

describe("Episode", () => {
  it("renders the episodes data", () => {
    const { queryByText } = render(
      <EpisodesList ids={["1", "2", "3"]} limit={5} />,
      {
        preloadedState: STORE_FIXTURES.state,
      }
    );
    expect(queryByText("S01E01 - Pilot")).toBeVisible();
    expect(queryByText("S01E02 - Lawnmower Dog")).toBeVisible();
    expect(queryByText("S01E03 - Anatomy Park")).toBeVisible();
  });

  it("renders the episodes data truncated to the limit value", () => {
    const { queryByText } = render(
      <EpisodesList ids={["1", "2", "3", "4"]} limit={2} />,
      {
        preloadedState: STORE_FIXTURES.state,
      }
    );
    expect(queryByText("S01E01 - Pilot")).toBeVisible();
    expect(queryByText("S01E02 - Lawnmower Dog")).toBeVisible();
    expect(queryByText("... and 2 more episodes")).toBeVisible();
  });
});
