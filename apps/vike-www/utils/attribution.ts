import omitBy from "lodash/omitBy";
import isEmpty from "lodash/isEmpty";
import queryString from "query-string";
import window from "global/window";

const attributionMapping = {
  d: "direct_invite",
  c: "coparent",
  r: "reminder",
  r3: "sms_3_reminder",
  r7: "sms_7_reminder",
} as const;
const campaignAttributions = [
  "newClassPost",
  "coparentCampaign",
  "holdoutParentInvite",
  "invitedFridayReport",
  "newSchoolPost",
  "individual_printout_qrcode",
] as const;

type QueryAttributionKey = keyof typeof attributionMapping;
type ParentInviteAttribution = (typeof attributionMapping)[QueryAttributionKey];

const methods = {
  s: "sms",
  w: "whatsapp",
  attr: "email",
} as const;

type Methods = typeof methods;
type AvailableMethods = Methods[keyof Methods];

type ParsedAttribution = {
  attr?: QueryAttributionKey | (typeof campaignAttributions)[number];
  s?: QueryAttributionKey | "";
  w?: QueryAttributionKey;
  target?: "code" | "class" | "school";
  format?: "qrCode";
  email_exists?: "true";
};

type Attribution = {
  attribution: ParentInviteAttribution | "classlink_qrcode" | "class_link" | "school_link" | "unknown";
  method?: AvailableMethods;
} & ParsedAttribution;

const calcAttributionData = (): Attribution => {
  const parsedAttribution = parseQueryParams();

  const { target } = parsedAttribution;
  if (["code", "join"].includes(target)) {
    return codeAttribution(parsedAttribution);
  }

  if (target === "class") {
    return classAttribution(parsedAttribution);
  }

  if (target === "school") {
    return schoolAttribution(parsedAttribution);
  }

  if ("s" in parsedAttribution) {
    return { attribution: "direct_invite", method: "sms", ...parsedAttribution };
  }

  return {
    attribution: "unknown",
    ...parsedAttribution,
  };
};

const parseQueryParams = () => {
  const parsedLocation = queryString.parse(window?.location?.search || "");
  const attributionKeys = ["attr", "s", "w", "format", "target"] as const;
  return attributionKeys.reduce((acc, key) => {
    const attributionValue = parsedLocation[key];
    if (!attributionValue && attributionValue !== null) {
      return acc;
    }
    return { ...acc, [key]: attributionValue };
  }, {} as Partial<ParsedAttribution>);
};

const codeAttribution = (parsedAttribution: ParsedAttribution): Attribution => {
  // for invites with a pcode on it we map attribution on attrMap above
  for (const method of ["s", "w", "attr"] as const) {
    // s = SMS, w = whatsapp, attr = all other code invites
    if (method in parsedAttribution) {
      const seenAttribution = parsedAttribution[method];
      const attributionType =
        method === "attr" && (campaignAttributions as ReadonlyArray<string>).includes(seenAttribution)
          ? seenAttribution
          : attributionMapping[seenAttribution] ?? "unknown";

      const { target, format } = parsedAttribution;

      const metadata =
        attributionType === "unknown"
          ? {
              [method]: seenAttribution,
              target,
              format,
            }
          : {};
      return { attribution: attributionType, method: methods[method], ...metadata };
    }
  }
  return { attribution: "unknown", ...parsedAttribution };
};

export const calcCodeAttribution = () => {
  const parsedAttribution = parseQueryParams();
  return new URLSearchParams(omitBy(codeAttribution(parsedAttribution), isEmpty));
};

const classAttribution = ({ format, attr, s, w }: ParsedAttribution): Attribution => {
  if (format === "qrCode") {
    return { attribution: "classlink_qrcode", attr, s, w };
  }
  return { attribution: "class_link", attr, s, w, format };
};

const schoolAttribution = ({ format, attr, s, w }: ParsedAttribution): Attribution => {
  return { attribution: "school_link", attr, s, w, format };
};

const parseCoTeacherAttribution = () => {
  const parsedAttribution = parseQueryParams();
  const { target, attr, s, w, format, email_exists } = parsedAttribution;
  if (target === "class") {
    return { attribution: "coteacher", attr, s, w, format, email_exists };
  }
};

// remove undefined keys from the calcAttributionData's first
export const getAttrSearchParams = () => new URLSearchParams(omitBy(calcAttributionData(), isEmpty));
export const getAttributionParamForCoTeachers = () => new URLSearchParams(omitBy(parseCoTeacherAttribution(), isEmpty));
