export const getProductCheckList = productDetails => {
  if (!productDetails || !productDetails.length) {
    return null;
  }

  const list = productDetails.filter(item => item.icon);

  if (!list.length) {
    return null;
  }

  return list.map(detail => detail.value || 'Detail');
};

export default getProductCheckList;
