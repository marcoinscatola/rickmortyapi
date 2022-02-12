import { useEffect } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Grid, Section, SubHeading } from "@/components";
import {
  Character,
  Pagination,
  requestCharactersPage,
  selectPageStatus,
  selectPagination,
} from "@/features/characters";
import { useAppDispatch, useAppSelector, createStore } from "@/store";
import Link from "next/link";
import { spacing } from "@/theme";
import { useRouter } from "next/router";

const CharactersPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const page =
    typeof router.query.page === "string" ? parseInt(router.query.page, 10) : 1;

  const pageState = useAppSelector((state) => selectPageStatus(state, page));
  const { current, pages } = useAppSelector(selectPagination);

  useEffect(() => {
    if (!pageState) {
      dispatch(requestCharactersPage(page));
    }
  }, [page, dispatch, pageState]);

  // If the page state doesn't exist it means that redux has yet to handle the
  // thunk `pending` action.
  if (!pageState) return null;

  const { ids, status, error } = pageState;

  if (error) {
    return (
      <div
        css={`
          background-color: "red";
          color: "white";
          text-align: center;
          padding: ${spacing(3)};
        `}
      >
        <h3>An error occurred: {error}</h3>
        <p>
          <Link href={`/${page}`}>
            <a title="reload page">You can reload the page by clicking here</a>
          </Link>
        </p>
      </div>
    );
  }

  if (status === "loading" || !ids) {
    return (
      <Section>
        <SubHeading>Loading...</SubHeading>
      </Section>
    );
  }

  return (
    <>
      <Grid
        css={`
          padding: ${spacing(3)};
        `}
      >
        {ids.map((id) => (
          <Character key={id} id={id} />
        ))}
      </Grid>
      <Pagination
        shallow
        baseUrl="/characters"
        currentPage={current}
        totalPages={pages}
        trailing={2}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<{}, { page: string }> = async (
  ctx
) => {
  // Page will be undefined on `index` but we can reuse the same logic in `[page]` this way.
  const page = parseInt(ctx.params?.page ?? "1");
  if (!page || page < 1) {
    return {
      redirect: {
        destination: "/characters/1",
      },
      props: {},
    };
  }
  const store = createStore();
  try {
    await store.dispatch(requestCharactersPage(page)).unwrap();
  } finally {
    return {
      props: {
        initialState: store.getState(),
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths<{ page: string }> = (ctx) => {
  return {
    paths: [
      {
        params: {
          page: "1",
        },
      },
    ],
    fallback: "blocking",
  };
};

export default CharactersPage;
