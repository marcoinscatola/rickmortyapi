// Returns an ID from a resource URL. The URL format should be `www.example.url/resource/[id]`
export const extractIdFromUrl: (url: string) => string = (url) => {
  const matches = /\d+$/.exec(url);
  if (!matches) {
    throw new Error(
      "(extractIdFromUrl): The provided `url` doesn't contain an ID"
    );
  }
  return matches[0];
};
