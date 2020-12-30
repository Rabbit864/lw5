/*
eslint no-return-assign: "error"
*/
export function getPriceTotal(product) {
  return product.count * product.priceForOne;
}

export function getAllPrice(products) {
  const reducer = (accumulator, product) => accumulator + getPriceTotal(product);
  return products.reduce(reducer, 0);
}

export function calculationPriceProduct(products) {
  products.forEach((product) => (product.priceTotal = getPriceTotal(product)));
  return products;
}

export function setCountProduct(product, count) {
  product.count = count;
}

export function setPriceForOne(product, priceForOne) {
  product.priceForOne = priceForOne;
}
