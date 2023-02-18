// const validName = 'Martelo de Thor';

const allSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
];

const saleByIdMock = [
  {
    "date": "2023-02-18T19:45:20.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-02-18T19:45:20.000Z",
    "productId": 2,
    "quantity": 10
  }
];

// const productUpdated = {
//   id: 1,
//   name: 'Eh o Trikas',
// };

// const invalidName = 'a';
// const validId = 1;

const wrongProductsInfoMock = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
  },
  {
    "productId": 2,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": -1
  }
];

module.exports = {
  allSales,
  saleByIdMock,
  wrongProductsInfoMock,
};