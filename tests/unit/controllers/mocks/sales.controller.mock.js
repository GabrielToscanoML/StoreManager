const allSalesMock = [
  {
    "saleId": 1,
    "date": "2023-02-18T19:45:20.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-18T19:45:20.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-18T19:45:20.000Z",
    "productId": 3,
    "quantity": 15
  }
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

const createSaleMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const saleCreatedMock = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

module.exports = {
  allSalesMock,
  saleByIdMock,
  createSaleMock,
  saleCreatedMock,
}
