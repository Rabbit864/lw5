const moduleProduct = require('../js/productsFunctional');

test('check the receipt of the full cost of each product', () => {
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
  const products = moduleProduct.calculationPriceProduct(productElements);
  expect(products[0].priceTotal).toBe(2000);
  expect(products[1].priceTotal).toBe(2000);
  expect(products[2].priceTotal).toBe(1000);
  expect(products).toHaveLength(3);
});

test('check receipt of the whole price of products', () => {
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
  expect(moduleProduct.getAllPrice(productElements)).toBe(5000);
});

test('check count setting for products', () => {
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
  moduleProduct.setCountProduct(productElements[0], 4);
  moduleProduct.setCountProduct(productElements[1], 7);
  moduleProduct.setCountProduct(productElements[2], 10);
  expect(productElements[0].count).toEqual(4);
  expect(productElements[1].count).toEqual(7);
  expect(productElements[2].count).toEqual(10);
});

test('check count setting for products', () => {
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
  moduleProduct.setPriceForOne(productElements[0], 12);
  moduleProduct.setPriceForOne(productElements[1], 5);
  moduleProduct.setPriceForOne(productElements[2], 75);
  expect(productElements[0].priceForOne).toEqual(12);
  expect(productElements[1].priceForOne).toEqual(5);
  expect(productElements[2].priceForOne).toEqual(75);
});
