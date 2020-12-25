/*
eslint no-return-assign: "error"
*/
import productsTemplate from '../template/products.handlebars';

function getPriceTotal(product) {
  return product.count * product.priceForOne;
}

function getAllPrice(products) {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += getPriceTotal(products[i]);
  }
  return sum;
}

function calculationPriceProduct(products) {
  products.forEach(
    (product) => (product.priceTotal = getPriceTotal(product))
  );
}

function setCountProduct(product, count) {
  product.count = count;
}

function setPriceForOne(product, priceForOne) {
  product.priceForOne = priceForOne;
}

const productElements = [
  {
    id: 1,
    name: 'Молоко',
    count: 40,
    priceForOne: 50
  },
  {
    id: 2,
    name: 'Хлеб',
    count: 100,
    priceForOne: 20
  },
  {
    id: 3,
    name: 'Лук',
    count: 200,
    priceForOne: 5
  }
];
window.onload = function load() {
  function updateUI() {
    calculationPriceProduct(productElements);
    const allPrice = getAllPrice(productElements);
    const productsHTML = productsTemplate({ productElements, allPrice });
    document.querySelector('body').innerHTML = productsHTML;
    document.querySelectorAll('.products__element input').forEach((element) => {
      element.addEventListener('dblclick', (event) => {
        event.target.readOnly = false;
      });
    });
    document
      .querySelectorAll('.products__element .products__element--count')
      .forEach((element) => {
        element.addEventListener('keydown', (event) => {
          if (event.keyCode === 13) {
            const id = +event.target.id.replace('count-', '');
            productElements.forEach((product) => {
              if (product.id === id) {
                setCountProduct(product, +event.target.value);
                updateUI();
              }
            });
          }
        });
      });
    document
      .querySelectorAll('.products__element .products__element--priceForOne')
      .forEach((element) => {
        element.addEventListener('keydown', (event) => {
          if (event.keyCode === 13) {
            const id = +event.target.id.replace('priceForOne-', '');
            productElements.forEach((product) => {
              if (product.id === id) {
                setPriceForOne(product, +event.target.value);
                updateUI();
              }
            });
          }
        });
      });
  }

  updateUI();
};

module.exports = getAllPrice;
