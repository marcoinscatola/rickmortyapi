import { FC } from "react";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionSection,
  DescriptionTerm,
} from "@/components";
import { LocationEntity } from "../..";

interface BaseLocationProps {
  data: LocationEntity;
}

export const BaseLocation: FC<BaseLocationProps> = ({ data }) => {
  return (
    <DescriptionList>
      <DescriptionSection>
        <DescriptionTerm>Name</DescriptionTerm>
        <DescriptionDetails>
          <strong>{data.name}</strong>
        </DescriptionDetails>
      </DescriptionSection>
      <DescriptionSection>
        <DescriptionTerm>Dimension</DescriptionTerm>
        <DescriptionDetails>{data.dimension}</DescriptionDetails>
      </DescriptionSection>
      {data.type && (
        <DescriptionSection>
          <DescriptionTerm>Type</DescriptionTerm>
          <DescriptionDetails>{data.type}</DescriptionDetails>
        </DescriptionSection>
      )}
      <DescriptionSection>
        <DescriptionTerm>Residents</DescriptionTerm>
        <DescriptionDetails>{data.residents.length}</DescriptionDetails>
      </DescriptionSection>
    </DescriptionList>
  );
};
