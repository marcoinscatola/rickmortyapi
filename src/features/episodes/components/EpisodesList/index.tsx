import type { FC } from "react";
import { ID } from "@/features/api";
import { Episode } from "../Episode";

interface EpisodesListProps {
  ids: ID[];
  limit: number;
}

export const EpisodesList: FC<EpisodesListProps> = ({ ids, limit }) => {
  const isTruncated = ids.length > limit;
  const episodesToShow = isTruncated ? ids.slice(0, limit) : ids;
  return (
    <ul css={``}>
      {episodesToShow.map((id) => (
        <li key={id}>
          <Episode id={id} />
        </li>
      ))}
      {isTruncated && (
        <li>... and {ids.length - episodesToShow.length} more episodes</li>
      )}
    </ul>
  );
};
