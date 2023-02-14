// tests/unit/models/passenger.model.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
  sinon.stub(connection, 'execute').resolves([products]);
  // Act
  const result = await productsModel.getAllProducts();
  // Assert
  expect(result).to.be.deep.equal(products);
  });

  afterEach(function () {
    sinon.restore();
  });
});