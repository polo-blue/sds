export const getPriceFormatted = (product: any) => {
  // Default to EUR formatting for English-only design system
  if (product.price_eur) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
      product.price_eur
    );
  }
  if (product.price_pln) {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(
      product.price_pln
    );
  }
  return 'no price';
};

export default getPriceFormatted;
