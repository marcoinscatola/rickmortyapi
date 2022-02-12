import {
  Card,
  CardAnnexWrapper,
  CardContentWrapper,
  CardImage,
  CardImageWrapper,
  CardTitle,
} from "..";
import { render } from "@/test/test-utils";

const TestCard = (
  <Card>
    <CardImageWrapper>
      <CardImage
        src="/img/mock.png"
        alt="test image"
        width={100}
        height={100}
      />
    </CardImageWrapper>
    <CardContentWrapper>
      <CardTitle>Title</CardTitle>
      <p>Description</p>
    </CardContentWrapper>
    <CardAnnexWrapper>
      <p>Extra content</p>
    </CardAnnexWrapper>
  </Card>
);

describe("Card", () => {
  it("renders an `article` tag", () => {
    const { container } = render(TestCard);
    expect(container.querySelector("article")).not.toBeNull();
  });

  it("renders the card title", () => {
    const { queryByText } = render(TestCard);
    expect(queryByText("Title")).toBeVisible();
  });

  it("renders the card image", () => {
    const { queryByAltText } = render(TestCard);
    const image = queryByAltText("test image");
    expect(image).toBeVisible();
  });

  it("renders the card content", () => {
    const { queryByText } = render(TestCard);
    expect(queryByText("Description")).toBeVisible();
  });

  it("renders the card extra content", () => {
    const { queryByText } = render(TestCard);
    expect(queryByText("Extra content")).toBeVisible();
  });
});
