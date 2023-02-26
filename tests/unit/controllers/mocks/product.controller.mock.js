const productMock = {
  name: 'Martelo Thor',
};

const newProductMock = { id: 1, ...productMock };

const productListMock = [newProductMock];

const productFilteredMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
];

module.exports = {
  productMock,
  newProductMock,
  productListMock,
  productFilteredMock,
}