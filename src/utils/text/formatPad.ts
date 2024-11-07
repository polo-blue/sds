export const formatPad = (num: number, size: number) => {
  return String(num).padStart(size, '0');
}

// export const formatPad = (num: number, size: number) => {
//   let productId = String(num)

//   if (size < 10)
//     while (productId.length < size) productId = `0${productId}`

//   return productId
// }