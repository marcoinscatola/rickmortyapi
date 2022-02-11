import { useLocation } from "../hooks";
import { render } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { FC } from "react";

const ComponentWithUseLocation: FC = () => {
  const { data, loading } = useLocation(1);
  if (loading) {
    return <div>Loading</div>;
  }
  return <div>{data?.name}</div>;
};

describe("useLocation", () => {
  it("returns `loading: true` if the data is not ready", () => {
    const { getByText } = render(<ComponentWithUseLocation />);
    expect(getByText("Loading")).toBeInTheDocument();
  });

  it("returns the location data if it's ready in the state app ", () => {
    const { getByText } = render(<ComponentWithUseLocation />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(getByText("Earth (C-137)")).toBeInTheDocument();
  });
});
