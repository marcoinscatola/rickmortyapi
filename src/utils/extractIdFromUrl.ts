// Returns an ID from a resource URL. The URL format should be `www.example.url/resource/[id]`
export const extractIdFromUrl: (url: string) => number = (url) => {
  const matches = /\d+$/.exec(url);
  if (!matches) {
    throw new Error(
      "(extractIdFromUrl): The provided `url` doesn't contain an ID"
    );
  }
  return parseInt(matches[0], 10);
};
