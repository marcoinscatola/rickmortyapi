import type { GetStaticProps, NextPage } from "next";

const Home: NextPage = () => {
  return null;
};

export const getStaticProps: GetStaticProps<
  {},
  { page: string }
> = async () => {
  return {
    redirect: {
      destination: "/characters/1",
    },
    props: {},
  };
};

export default Home;
