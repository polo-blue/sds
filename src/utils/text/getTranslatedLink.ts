import i18next from "i18next";

export const getTranslatedLink = ( link:string ) => {
  return i18next.language === 'en' ? link : `/pl${link}`
}