/*
eslint no-return-assign: "error"
*/
export function getPriceTotal(product) {
  return product.count * product.priceForOne;
}

export function getAllPrice(products) {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += getPriceTotal(products[i]);
  }
  return sum;
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
