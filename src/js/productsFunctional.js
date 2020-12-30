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
  return products.map((product) => Object.assign(product, { priceTotal: getPriceTotal(product) }));
}

export function setCountProduct(product, count) {
  if (Number.isNaN(count) || count < 0 || typeof count !== 'number') {
    return false;
  }
  product.count = count;
  return true;
}

export function setPriceForOne(product, priceForOne) {
  if (Number.isNaN(priceForOne) || priceForOne < 0 || typeof priceForOne !== 'number') {
    return false;
  }
  product.priceForOne = priceForOne;
  return true;
}
