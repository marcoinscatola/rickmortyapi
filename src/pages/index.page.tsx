import type { GetServerSideProps, NextPage } from "next";

const Home: NextPage = () => {
  return null;
};

// The index will simply redirect to the first characters page
export const getServerSideProps: GetServerSideProps<
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
