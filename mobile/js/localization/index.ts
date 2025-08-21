import LocalizedStrings from 'react-native-localization';
import en from './locales/en'
import vi from './locales/en'

const Localization = new LocalizedStrings({
  en,
  vi
});

export const getCurrentLanguage = () => {
  return Localization.getLanguage(); // e.g., "en"
};

export const getTranslation = (translates: Array<any>, language: string) => {
  try {
    const translation = translates.find(t => t.language === language);
    const result = translation
      ? translation.value
      : 'Translation not available';
    return result;
  } catch (err) {
    console.log(err);
  }
};

export function t(key: string, params:any = {}) {
  let text = Localization.getString(key)
  if (!params) {
    return text;
  }
  const entries = Object.entries(params);

  if (entries.length === 0) {
    return text;
  }

  for (const [k, v] of entries) {
    if (typeof v === "object" || !Array.isArray(v)) {
      continue; // we won't handle these type
    }
    text = text.replaceAll(`${k}`, v.valueOf().toString()); //Todo: use RegExp instead of.
  }
}

export default Localization;
