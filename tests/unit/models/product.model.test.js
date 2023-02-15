// tests/unit/models/passenger.model.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, insertProductMock } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
  sinon.stub(connection, 'execute').resolves([products]);
  // Act
  const result = await productsModel.getAllProducts();
  // Assert
  expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // Act
    const result = await productsModel.getProductById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Inserindo um produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([insertProductMock]);
    // Act
    await productsModel.insertProduct({ name: "ProdutoX" });
    const result = await productsModel.getAllProducts();
    // Assert
    expect(result).to.be.deep.equal(insertProductMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});