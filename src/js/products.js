/*
eslint no-return-assign: "error"
*/
import productsTemplate from '../template/products.handlebars';

function createObservableArray(array, callback) {
  return new Proxy(array, {
    set(target, property, value) {
      target[property] = value;
      callback();
      return true;
    }
  });
}

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
const productElements = createObservableArray(
  [
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
  ],
  updateUI
);
window.onload = function load() {
  function updateUI() {
    productElements.forEach(
      (product) => (product.priceTotal = getPriceTotal(product))
    );
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
                product.count = +event.target.value;
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
                product.priceForOne = +event.target.value;
              }
            });
          }
        });
      });
  }
  updateUI();
};
