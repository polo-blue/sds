export const getNumberFormatted = (num, digits) => {
  const lookup = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
    { value: 1, symbol: '' },
  ];
  const item = lookup.find(item => num >= item.value) || lookup[lookup.length - 1];
  return (num / item.value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + item.symbol;
};

export default getNumberFormatted;
/*
 * Tests
 */
// const tests = [
//   { num: 0, digits: 1 },
//   { num: 12, digits: 1 },
//   { num: 1234, digits: 1 },
//   { num: 100000000, digits: 1 },
//   { num: 299792458, digits: 1 },
//   { num: 759878, digits: 1 },
//   { num: 759878, digits: 0 },
//   { num: 123, digits: 1 },
//   { num: 123.456, digits: 1 },
//   { num: 123.456, digits: 2 },
//   { num: 123.456, digits: 4 }
// ];
// tests.forEach(test => {
//   console.log("getNumberFormatted(%f, %i) = %s", test.num, test.digits, getNumberFormatted(test.num, test.digits));
// });
