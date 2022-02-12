import HomePage from "..";
import { expectVisible, render, fetch, waitFor } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import * as API_FIXTURES from "@/features/api/tests/fixtures";
import { CharacterEntity } from "@/features/characters";

afterEach(() => {
  fetch.reset();
});

describe("HomePage", () => {
  it("renders the page using the character data found in the props if available", () => {
    fetch.mock("*", {});
    const characters = Object.values(
      STORE_FIXTURES.state.characters.entities
    ) as CharacterEntity[];
    render(<HomePage characters={characters} page="1" />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(fetch.calls()).toHaveLength(0);
  });

  it("renders an error message if the `error` prop is present", () => {
    const { getByText, getByTitle } = render(
      <HomePage page="1" error="Failed to fetch" />
    );

    expect(getByText(/Failed to fetch/)).toBeVisible();
    const reloadLink = getByTitle("reload page");
    expect(reloadLink).toBeVisible();
    expect(reloadLink).toHaveAttribute("href", "/1");
  });
});
