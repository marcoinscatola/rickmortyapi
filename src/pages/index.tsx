import type { GetStaticProps, NextPage } from "next";
import { Grid } from "@/components";
import { Character, requestCharactersPage } from "@/features/characters";
import { CharacterEntity } from "@/features/characters";
import { createStore, RootState, useAppDispatch } from "@/store";
import Link from "next/link";
import { spacing } from "@/theme";

interface HomePageProps {
  characters?: CharacterEntity[];
  error?: string | Error;
  initialState?: RootState;
  page: string;
}

const Home: NextPage<HomePageProps> = ({ characters, page, error }) => {
  if (error) {
    return (
      <div
        css={`
          background-color: "red";
          color: "white";
          text-align: center;
        `}
      >
        <h2>An error occurred: {error}</h2>
        <p>
          You can reload the page by clicking{" "}
          <Link href={`/${page}`}>
            <a title="reload page">here</a>
          </Link>
        </p>
      </div>
    );
  }

  if (!characters) {
    return null;
  }

  const nextPage = parseInt(page) + 1;

  return (
    <>
      <Grid
        css={`
          padding: ${spacing(3)};
        `}
      >
        {characters.map(({ id }) => (
          <Character key={id} id={id} />
        ))}
      </Grid>
      <Link href={`/${nextPage}`}>
        <a>Go to page {nextPage}</a>
      </Link>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  HomePageProps,
  { page: string }
> = async (ctx) => {
  const page = ctx.params?.page ?? "1";
  const store = createStore();
  const res = await store.dispatch(requestCharactersPage(page));

  if (res.meta.requestStatus === "fulfilled") {
    return {
      props: {
        characters: res.payload as CharacterEntity[],
        initialState: store.getState(),
        page,
      },
    };
  } else {
    return {
      props: {
        error: (res.payload as Error | string).toString(),
        page,
      },
    };
  }
};

export default Home;
