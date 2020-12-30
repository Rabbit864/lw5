const moduleHelpers = require('../utils/helper');

test('check createObservableObject on Proxy', () => {
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
  const number = jest.fn(() => 23);
  for (let i = 0; i < productElements.length; i++) {
    productElements[i] = moduleHelpers.createObservableObject(productElements[i], number);
  }
  productElements[0].count = 4;
  expect(number).toBeCalled();
  productElements[0].count = 4;
  expect(number).toBeCalledTimes(2);
});

test('check createObservableArray on Proxy', () => {
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
  const number = jest.fn(() => 23);
  const products = moduleHelpers.createObservableArray(productElements, number);
  products[0] = 1;
  expect(number).toBeCalled();
  delete products[1];
  expect(number).toBeCalledTimes(2);
});
