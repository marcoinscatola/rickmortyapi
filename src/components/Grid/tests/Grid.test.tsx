import { Grid } from "..";
import { expectVisible, render } from "@/test/test-utils";

describe("Grid", () => {
  it("renders the children", () => {
    const { queryAllByText } = render(
      <Grid>
        <div>Inner</div>
        <div>Inner</div>
      </Grid>
    );
    queryAllByText(/Inner/).forEach(expectVisible);
    expect.assertions(2);
  });
});
