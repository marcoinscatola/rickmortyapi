import { BaseLocation } from "..";
import { render } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { LocationEntity } from "@/features/locations";

const location: LocationEntity = {
  id: 1,
  name: "test",
  type: "test type",
  dimension: "test dimension",
  residents: [1, 2, 3],
  url: "",
  created: "",
};

describe("BaseLocation", () => {
  it("renders the provided location data ", () => {
    const { queryByText } = render(<BaseLocation data={location} />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(queryByText(location.name)).toBeVisible();
    expect(queryByText(location.type)).toBeVisible();
    expect(queryByText(location.dimension)).toBeVisible();
    expect(queryByText(location.residents.length)).toBeVisible();
  });
});
