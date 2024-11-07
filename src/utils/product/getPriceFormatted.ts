import i18next from "i18next";

export const getPriceFormatted  = (product: any) => {
    if (i18next.language === 'en') {
      return  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price_eur, )
    }
    if (i18next.language === 'pl') {
      return  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(product.price_pln, )
    }
    else {
      return 'no price'
    }
  }
  

  export default getPriceFormatted;