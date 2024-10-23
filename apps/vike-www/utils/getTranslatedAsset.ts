const englishSpeakingLocales = ["en", "en-us", "en-gb"];

export const getTranslatedAssetFromRepeater = (
  collection: Record<string, string>[],
  originalUserLanguage: string,
  languageKey = "language",
  assetKey = "url",
): { hasTranslatedAsset: boolean; assetUrl: string } => {
  const userLanguage =
    englishSpeakingLocales.indexOf(originalUserLanguage.toLowerCase()) > -1
      ? "en-us"
      : originalUserLanguage.toLowerCase();
  const hasTranslatedAsset = collection.map((item) => item[languageKey].toLowerCase()).indexOf(userLanguage) > -1;
  const toBeusedLocale = hasTranslatedAsset ? userLanguage.toLowerCase() : "en-us";
  const foundItem = collection.find((item) => item[languageKey].toLowerCase() === toBeusedLocale);
  const assetUrl = foundItem && assetKey in foundItem ? foundItem[assetKey] : "";
  return {
    hasTranslatedAsset,
    assetUrl,
  };
};
