import { getData } from '../getData';

export const getApiCategories = getData('categories');

// const getApiCategories = async () => {
//     return await getData('categories');
// }

export default getApiCategories;
