import { GetStaticPaths } from "next";
import HomePage, { getStaticProps } from ".";

export default HomePage;

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

export { getStaticProps };
