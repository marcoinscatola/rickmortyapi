import CharacterPage from "../[page]";
import { render, fetch } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import * as API_FIXTURES from "@/features/api/tests/fixtures";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

afterEach(() => {
  fetch.reset();
  useRouter.mockClear();
});

describe("CharacterPage", () => {
  it("renders the page using the character data found in the state if available", () => {
    fetch.mock("*", {});
    useRouter.mockImplementation(() => ({
      query: {
        page: 1,
      },
    }));
    render(<CharacterPage />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(fetch.calls()).toHaveLength(0);
  });

  it("calls the api if the character data is not available in the props", async () => {
    const mock = fetch
      .mock(/api\/character/, API_FIXTURES.paginatedCharacters)
      .mock(/api\/episode/, API_FIXTURES.episodes)
      .mock(/api\/location/, API_FIXTURES.locations);

    useRouter.mockImplementation(() => ({
      query: {
        page: "10",
      },
    }));

    const { findAllByAltText } = render(<CharacterPage />, {
      preloadedState: STORE_FIXTURES.state,
    });

    // Assume that the render is done when the images are found in the DOM.
    const images = await findAllByAltText(/.+/);
    expect(images).toHaveLength(
      API_FIXTURES.paginatedCharacters.results.length
    );
    expect(mock.called(/api\/character/)).toBe(true);
    expect(mock.called(/api\/episode/)).toBe(true);
    expect(mock.called(/api\/location/)).toBe(true);
  });

  it("renders an error message if the `error` prop is present", () => {
    useRouter.mockImplementation(() => ({
      query: {
        page: "2",
      },
    }));

    const { getByText, getByTitle } = render(<CharacterPage />, {
      preloadedState: STORE_FIXTURES.stateWithError,
    });

    expect(getByText(/Failed to fetch/)).toBeVisible();
    const reloadLink = getByTitle("reload page");
    expect(reloadLink).toBeVisible();
    expect(reloadLink).toHaveAttribute("href", "/2");
  });

  it("renders a pagination component", () => {
    useRouter.mockImplementation(() => ({
      query: {
        page: "1",
      },
    }));

    const { getAllByTitle } = render(<CharacterPage />, {
      preloadedState: {
        ...STORE_FIXTURES.state,
        characters: {
          ...STORE_FIXTURES.state.characters,
          pagination: {
            current: 4,
            pages: 10,
          },
        },
      },
    });

    // First page + 2 trailing behind + 2 trailing ahead + last page
    // (current page ignored as it's not a link)
    expect(getAllByTitle(/page/i)).toHaveLength(6);
  });
});
