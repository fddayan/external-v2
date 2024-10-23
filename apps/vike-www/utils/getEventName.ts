export default function (name: string) {
  return name
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");
}
