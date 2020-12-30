import productsTemplate from '../template/products.handlebars';
import {
  getAllPrice,
  calculationPriceProduct,
  setCountProduct,
  setPriceForOne
} from './productsFunctional';
import {
  createObservableArray,
  createObservableObject
} from '../utils/helpers/core/helper';

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
                const newCount = +event.target.value;
                if (setCountProduct(product, newCount) === false) {
                  alert('Введенно не верное значение');
                }
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
                const newPrice = +event.target.value;
                if (setPriceForOne(product, newPrice) === false) {
                  alert('Введенно не верное значение');
                }
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
