import productsTemplate from '../template/products.handlebars';
import {
  getAllPrice,
  calculationPriceProduct,
  setCountProduct,
  setPriceForOne
} from './productsFunctional';

function createObservableArray(array, callback) {
  return new Proxy(array, {
    apply(target, thisArg) {
      callback();
      return thisArg[target].apply(this, argumentList);
    },
    deleteProperty() {
      callback();
      return true;
    },
    set(target, property, value) {
      target[property] = value;
      callback();
      return true;
    }
  });
}

function createObservableObject(array, callback) {
  return new Proxy(array, {
    set(target, property, value) {
      target[property] = value;
      if (property === 'count' || property === 'priceForOne') {
        callback();
      }
      return true;
    }
  });
}

let productElements = [
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
    productElements = calculationPriceProduct(productElements);
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
              }
            });
          }
        });
      });
  }
  for (let i = 0; i < productElements.length; i++) {
    productElements[i] = createObservableObject(productElements[i], updateUI);
  }
  productElements = createObservableArray(productElements, updateUI);
  updateUI();
};
