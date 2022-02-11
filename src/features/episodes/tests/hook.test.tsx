import { useEpisode } from "../hooks";
import { render } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { FC } from "react";

const ComponentWithUseEpisode: FC = () => {
  const { data, loading } = useEpisode(1);
  if (loading) {
    return <div>Loading</div>;
  }
  return <div>{data?.name}</div>;
};

describe("useEpisode", () => {
  it("returns `loading: true` if the data is not ready", () => {
    const { getByText } = render(<ComponentWithUseEpisode />);
    expect(getByText("Loading")).toBeInTheDocument();
  });

  it("returns the episode data if it's ready in the state app ", () => {
    const { getByText } = render(<ComponentWithUseEpisode />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(getByText("Pilot")).toBeInTheDocument();
  });
});
