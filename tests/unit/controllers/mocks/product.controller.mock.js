const productMock = {
  name: 'Martelo Thor',
};

const newProductMock = { id: 1, ...productMock };

const productListMock = [newProductMock];

module.exports = {
  productMock,
  newProductMock,
}