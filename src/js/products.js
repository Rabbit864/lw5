import productsTemplate from '../template/products.handlebars';

window.onload = function load() {
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

  function getTotalProducts(product) {
    return product.count * product.priceForOne;
  }

  function getAllPrice(products) {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += getTotalProducts(products[i]);
    }
    return sum;
  }
  function updateUI() {
    const allPrice = getAllPrice(productElements);
    const productsHTML = productsTemplate({ productElements, allPrice });
    document.querySelector('body').innerHTML = productsHTML;
  }
  document.querySelectorAll('.products__element input').forEach((element) => {
    element.addEventListener('dblclick', (event) => {
      event.target.readOnly = false;
    });
  });
  updateUI();
};
