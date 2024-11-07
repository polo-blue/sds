import { t } from "i18next";

export const getProductCheckList = (productDetails) => {
    if (!productDetails || !productDetails.length) {
        return null;
    }

    const list = productDetails.filter(item => item.icon);

    if (!list.length) {
        return null;
    }

    return list.map(detail => t(`detail.value.${detail.value}`));
}

export default getProductCheckList;
