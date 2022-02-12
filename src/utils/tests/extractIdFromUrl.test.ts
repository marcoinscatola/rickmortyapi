import { extractIdFromUrl } from "../extractIdFromUrl";

describe("extractIdFromUrl", () => {
  it("extracts a resource id from an url with a specific format", () => {
    expect(extractIdFromUrl("https://www.example.com/resource/1")).toBe(1);
    expect(extractIdFromUrl("https://www.example.com/api/resource/2")).toBe(2);
    expect(extractIdFromUrl("https://www.example.com/3")).toBe(3);
  });

  it("throws if the URL doesn't contain a resource ID in the correct format", () => {
    expect(() =>
      extractIdFromUrl("https://www.example.com/resource/")
    ).toThrow();
    expect(() =>
      extractIdFromUrl("https://www.example.com/resource/1/")
    ).toThrow();
    expect(() =>
      extractIdFromUrl("https://www.example.com/resource/1/more")
    ).toThrow();
  });
});
