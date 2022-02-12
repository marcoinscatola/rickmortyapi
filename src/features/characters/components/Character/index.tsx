import { FC } from "react";
import { ID } from "@/features/api";
import {
  CardAnnexWrapper,
  CardContentWrapper,
  CardImage,
  CardImageWrapper,
  CardTitle,
  Section,
  Card,
  DescriptionDetails,
  DescriptionList,
  DescriptionSection,
  DescriptionTerm,
  SubHeading,
} from "@/components";
import { useCharacter } from "@/features/characters/hooks";
import { EpisodesList } from "@/features/episodes";
import { Location, UnknownLocation } from "@/features/locations";

export const Character: FC<{ id: ID }> = ({ id }) => {
  const { data, loading } = useCharacter(id);
  if (!data) {
    return <div>loading: {loading}</div>;
  }
  return (
    <Card>
      <CardImageWrapper>
        <CardImage
          src={data.image}
          title={data.name}
          alt={data.name}
          width={300}
          height={300}
        ></CardImage>
      </CardImageWrapper>
      <CardContentWrapper as="section">
        <CardTitle as="h2" title={data.name}>
          {data.name}
        </CardTitle>
        <DescriptionList>
          <DescriptionSection>
            <DescriptionTerm>Species</DescriptionTerm>
            <DescriptionDetails>{data.species}</DescriptionDetails>
          </DescriptionSection>
          <DescriptionSection>
            <DescriptionTerm>Type</DescriptionTerm>
            <DescriptionDetails>{data.type || "[none]"}</DescriptionDetails>
          </DescriptionSection>
          <DescriptionSection>
            <DescriptionTerm>Gender</DescriptionTerm>
            <DescriptionDetails>{data.gender}</DescriptionDetails>
          </DescriptionSection>
          <DescriptionSection>
            <DescriptionTerm>Status</DescriptionTerm>
            <DescriptionDetails>{data.status}</DescriptionDetails>
          </DescriptionSection>
        </DescriptionList>
      </CardContentWrapper>
      <CardAnnexWrapper>
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
            justify-content: stretch;
          `}
        >
          <Section
            css={`
              flex: 1 1 250px;
              width: 250px;
            `}
          >
            <SubHeading as="h3">Origin</SubHeading>
            {data.origin ? <Location id={data.origin} /> : <UnknownLocation />}
          </Section>
          <Section
            css={`
              flex: 1 1 250px;
              width: 250px;
            `}
          >
            <SubHeading as="h3">Location</SubHeading>
            {data.location ? (
              <Location id={data.location} />
            ) : (
              <UnknownLocation />
            )}
          </Section>
        </div>
        <Section>
          <SubHeading as="h3">Episodes</SubHeading>
          <EpisodesList ids={data.episode} limit={5}></EpisodesList>
        </Section>
      </CardAnnexWrapper>
    </Card>
  );
};
