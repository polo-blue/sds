export const getTranslatedLink = ( link:string, locale='en' ) => {
  return locale === 'en' ? link : `/${locale}${link}`
}

export default getTranslatedLink;
