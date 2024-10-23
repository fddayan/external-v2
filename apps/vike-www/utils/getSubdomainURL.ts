export type EntityType = "teacher" | "parent" | "student";
export function getSubdomainURL(entityType: EntityType) {
  const subdomain = {
    teacher: "teach",
    parent: "home",
    student: "student",
  }[entityType];
  if (!subdomain) throw new Error(`${entityType} has unknown subdomain`);
  return "https://" + subdomain + ".classdojo.com";
}
