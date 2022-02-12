import type { GetStaticProps, NextPage } from "next";

const Home: NextPage = () => {
  return null;
};

// The index will simply redirect to the first characters page
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
