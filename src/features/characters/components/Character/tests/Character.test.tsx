import { Character } from "..";
import { expectVisible, render } from "@/test/test-utils";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { CharacterEntity } from "@/features/characters";
import { ID } from "@/features/api";
import { LocationEntity } from "@/features/locations";

describe("Character", () => {
  it("renders the character data", () => {
    const characterId = STORE_FIXTURES.state.characters.ids[0];
    const characterData = STORE_FIXTURES.state.characters.entities[
      characterId
    ] as CharacterEntity;

    const { queryByText } = render(<Character id={characterId} />, {
      preloadedState: STORE_FIXTURES.state,
    });
    expect(queryByText(characterData.name)).toBeVisible();
    expect(queryByText(characterData.gender)).toBeVisible();
    expect(queryByText(characterData.status)).toBeVisible();
    expect(queryByText(characterData.type || "[none]")).toBeVisible();
    expect(queryByText(characterData.species)).toBeVisible();
  });

  it("renders the type as [none] if not present", () => {
    const characterDataWithoutType = Object.values(
      STORE_FIXTURES.state.characters.entities
    ).find((character) => !character!.type);
    if (!characterDataWithoutType) {
      throw new Error(
        "The fixture state should include at least a character without a type property"
      );
    }
    const { queryByText } = render(
      <Character id={characterDataWithoutType.id} />,
      {
        preloadedState: STORE_FIXTURES.state,
      }
    );

    expect(queryByText("[none]")).toBeVisible();
  });

  it("renders the type as correctly if present", () => {
    const characterDataWithType = Object.values(
      STORE_FIXTURES.state.characters.entities
    ).find((character) => character!.type);
    if (!characterDataWithType) {
      throw new Error(
        "The fixture state should include at least a character with a type property"
      );
    }
    const { queryByText } = render(
      <Character id={characterDataWithType.id} />,
      {
        preloadedState: STORE_FIXTURES.state,
      }
    );

    expect(queryByText(characterDataWithType.type)).toBeVisible();
  });

  it("renders the origin data if present", () => {
    const characterDataWithOrigin = Object.values(
      STORE_FIXTURES.state.characters.entities
    ).find((character) => character!.origin);

    const originData = STORE_FIXTURES.state.locations.entities[
      characterDataWithOrigin?.origin as ID
    ] as LocationEntity;

    if (!characterDataWithOrigin) {
      throw new Error(
        "The fixture state should include at least a character with an origin property"
      );
    }
    const { queryByText } = render(
      <Character id={characterDataWithOrigin.id} />,
      {
        preloadedState: STORE_FIXTURES.state,
      }
    );

    expect(queryByText(originData.name)).toBeVisible();
    expect(queryByText(originData.type)).toBeVisible();
    expect(queryByText(originData.dimension)).toBeVisible();
    expect(queryByText(originData.residents.length)).toBeVisible();
  });

  it("renders an unknown location if origin is not present in the character data", () => {
    const characterDataWithoutOrigin = Object.values(
      STORE_FIXTURES.state.characters.entities
    ).find((character) => !character!.origin);

    const originData = {
      name: "Unknown",
      type: "Unknown",
      dimension: "Unknown",
      residents: [],
    };

    if (!characterDataWithoutOrigin) {
      throw new Error(
        "The fixture state should include at least a character with an origin property"
      );
    }
    const { queryByText, queryAllByText } = render(
      <Character id={characterDataWithoutOrigin.id} />,
      {
        preloadedState: STORE_FIXTURES.state,
      }
    );

    // An unknown location would render the text 'Unknown' 3 times, for `name`, `type` and `dimension`
    queryAllByText("Unknown").forEach(expectVisible);
    expect(queryByText(originData.residents.length)).toBeVisible();
    expect.assertions(4);
  });

  it("renders the location data", () => {
    const characterDataWithLocation = Object.values(
      STORE_FIXTURES.state.characters.entities
    ).find((character) => character!.location);

    if (!characterDataWithLocation) {
      throw new Error(
        "The fixture state should include at least a character with a location property"
      );
    }

    const locationData = STORE_FIXTURES.state.locations.entities[
      characterDataWithLocation.location as ID
    ] as LocationEntity;

    const { queryByText } = render(
      <Character id={characterDataWithLocation.id} />,
      {
        preloadedState: STORE_FIXTURES.state,
      }
    );

    expect(queryByText(locationData.name)).toBeVisible();
    expect(queryByText(locationData.type)).toBeVisible();
    expect(queryByText(locationData.dimension)).toBeVisible();
    expect(queryByText(locationData.residents.length)).toBeVisible();
  });

  it("renders the episodes titles (<=5)", () => {
    const characterDataWithLessThanFiveEpisodes = Object.values(
      STORE_FIXTURES.state.characters.entities
    ).find((character) => character!.episode.length < 5);

    if (!characterDataWithLessThanFiveEpisodes) {
      throw new Error(
        "The fixture state should include at least a character with less than 5 episodes"
      );
    }

    const { queryAllByText } = render(
      <Character id={characterDataWithLessThanFiveEpisodes.id} />,
      {
        preloadedState: STORE_FIXTURES.state,
      }
    );

    queryAllByText(/S\d{2}E\d{2}/).forEach(expectVisible);
    expect.assertions(characterDataWithLessThanFiveEpisodes.episode.length);
  });

  it("renders the episodes titles (>5)", () => {
    const characterDataWithMoreThanFiveEpisodes = Object.values(
      STORE_FIXTURES.state.characters.entities
    ).find((character) => character!.episode.length > 5);

    if (!characterDataWithMoreThanFiveEpisodes) {
      throw new Error(
        "The fixture state should include at least a character with less than 5 episodes"
      );
    }

    const { queryByText, queryAllByText } = render(
      <Character id={characterDataWithMoreThanFiveEpisodes.id} />,
      {
        preloadedState: STORE_FIXTURES.state,
      }
    );

    queryAllByText(/S\d{2}E\d{2}/).forEach(expectVisible);
    expect(queryByText(/more episodes/)).toBeVisible();
    expect.assertions(6);
  });
});
