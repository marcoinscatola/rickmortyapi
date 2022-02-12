import { FC } from "react";
import { ID } from "@/features/api";
import { useLocation } from "@/features/locations/hooks";
import { BaseLocation } from "../BaseLocation";

export const Location: FC<{ id: ID }> = ({ id }) => {
  const { data, loading } = useLocation(id);

  if (!data) {
    return <div>loading: {loading}</div>;
  }

  return <BaseLocation data={data} />;
};
