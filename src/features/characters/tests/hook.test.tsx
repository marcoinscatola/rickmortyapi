import { useCharacter } from "../hooks";
import { render } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { FC } from "react";

const ComponentWithUseCharacter: FC = () => {
  const { data, loading } = useCharacter(1);
  if (loading) {
    return <div>Loading</div>;
  }
  return <div>{data?.name}</div>;
};

describe("useCharacter", () => {
  it("returns `loading: true` if the data is not ready", () => {
    const { getByText } = render(<ComponentWithUseCharacter />);
    expect(getByText("Loading")).toBeInTheDocument();
  });

  it("returns the character data if it's ready in the state app ", () => {
    const { getByText } = render(<ComponentWithUseCharacter />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(getByText("Rick Sanchez")).toBeInTheDocument();
  });
});
