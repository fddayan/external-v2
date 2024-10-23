// @ts-ignore
const req = require.context("./", true, /\.svg$/);

const icons = req.keys().reduce((images, path) => {
  images[path.replace("./", "").replace(".svg", "")] = req(path);
  return images;
}, {});

export default icons;
