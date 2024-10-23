export const getVimeoThumb = (url: string) => {
  const id = url.split("/")[3];
  return `https://vumbnail.com/${id}.jpg`;
};
