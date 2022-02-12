import { Location } from "..";
import { render } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { LocationEntity } from "@/features/locations";

describe("Location", () => {
  it("renders the provided location data ", () => {
    const id = "1";
    const location = STORE_FIXTURES.state.locations.entities[
      id
    ] as LocationEntity;
    const { queryByText } = render(<Location id={id} />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(queryByText(location.name)).toBeVisible();
    expect(queryByText(location.type)).toBeVisible();
    expect(queryByText(location.dimension)).toBeVisible();
    expect(queryByText(location.residents.length)).toBeVisible();
  });
});
