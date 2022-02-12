import { FC, useMemo } from "react";
import { BaseLocation } from "../BaseLocation";
import { LocationEntity } from "../../types";

export const UnknownLocation: FC = () => {
  const data = useMemo<LocationEntity>(
    () => ({
      name: "Unknown",
      id: 0,
      type: "Unknown",
      dimension: "Unknown",
      residents: [],
      url: "",
      created: "",
    }),
    []
  );

  return <BaseLocation data={data} />;
};
