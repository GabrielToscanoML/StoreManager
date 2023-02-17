const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allSales, getSaleByIdMock, insertSaleMock, productInfo } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de sales', function () {
  it('Recuperando a lista de vendas', async function () {
    // Arrange
  sinon.stub(connection, 'execute').resolves([allSales]);
  // Act
  const result = await salesModel.getAllSales();
  // Assert
  expect(result).to.be.deep.equal(allSales);
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([getSaleByIdMock]);
    // Act
    const result = await salesModel.getSaleById(1);
    // Assert
    expect(result).to.be.deep.equal(getSaleByIdMock);
  });

  it('Inserindo uma venda', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([insertSaleMock]);
    // Act
    await salesModel.insertSale(productInfo);
    const saleID = await salesModel.insertSalesProducts(3, { productId: 1, quantity: 1 });
    console.log('Sale Id', saleID);
    const result = await salesModel.getAllSales();
    // Assert
    expect(result).to.be.deep.equal(insertSaleMock);
    expect(saleID).to.be.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});
