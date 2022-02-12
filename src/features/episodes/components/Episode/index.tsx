import type { FC } from "react";
import { ID } from "@/features/api";
import { useEpisode } from "@/features/episodes";

interface EpisodeProps {
  id: ID;
}

export const Episode: FC<EpisodeProps> = ({ id }) => {
  const { data, loading } = useEpisode(id);
  if (!data) {
    return <div>loading: {loading}</div>;
  }
  return (
    <span>
      {data.episode} - {data.name}
    </span>
  );
};
