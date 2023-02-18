const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const { getSaleByIdMock, productInfo } = require('../models/mocks/sales.model.mock');
const { allSales, wrongProductsInfoMock } = require('./mocks/sales.service.mock');

describe('Verificando service sales', function () {
  describe('listagem de vendas', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(salesModel, 'getAllSales').resolves(allSales);
      // act
      const result = await salesServices.getAllSales();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });
  });
  
 describe('busca de uma venda', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await salesServices.getSaleById('a');
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso a venda não exista', async function () {
      // arrange
      sinon.stub(salesModel, 'getSaleById').resolves({ "type": "SALE_NOT_FOUND", "message": "Sale not found" });
      // act
      const result = await salesServices.getSaleById(1);
      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
    
    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(salesModel, 'getSaleById').resolves(getSaleByIdMock);
      // act
      const result = await salesServices.getSaleById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(getSaleByIdMock);
    });
  });

  // describe('cadastro de uma venda com valores inválidos', function () {
  //     it('retorna erro ao passar "productId" inexistente', async function () {
  //       // act
  //       const result = await salesServices.insertSale(wrongProductsInfoMock);
  //       // assert
  //       expect(result[0].type).to.equal('INVALID_VALUE');
  //       expect(result[0].message).to.equal('"productId" is required');
  //     });
  //     it('retorna erro ao passar "quantity" inexistente', async function () {
  //       // act
  //       const result = await salesServices.insertSale(wrongProductsInfoMock[1]);
  //       // assert
  //       expect(result.type).to.equal('INVALID_VALUE');
  //       expect(result.message).to.equal('"quantity" is required');
  //     });
  //     it('retorna erro ao passar "quantity" com valor igual a 0', async function () {
  //       // act
  //       const result = await salesServices.insertSale(wrongProductsInfoMock[2]);
  //       // assert
  //       expect(result.type).to.equal('INVALID_VALUE');
  //       expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
  //     });
  //     it('retorna erro ao passar "quantity" com valor igual a 0', async function () {
  //       // act
  //       const result = await salesServices.insertSale(wrongProductsInfoMock[3]);
  //       // assert
  //       expect(result.type).to.equal('INVALID_VALUE');
  //       expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
  //     });
  // });

  describe('cadastro de um produto com valores válidos', function () {
      it('retorna o ID de uma venda cadastrada', async function () {
        // arrange
        sinon.stub(salesModel, 'insertSale').resolves(1);
        sinon.stub(salesModel, 'getSaleById').resolves(allSales[0]);
        // act
        const result = await salesServices.insertSale(productInfo);
        expect(result.id).to.deep.equal(1);
      });
  });

  // describe('Atualização de produtos', function () {
  //     it('Atualiza um produto com ID válido', async function () {
  //       // arrange
  //       sinon.stub(productsModel, 'updateById').resolves(mock.validId);
  //       // act
  //       const result = await productsServices.updateProductById(mock.productUpdated);
  //       const currentProduct = await productsModel.getProductById({ id: 1 });
  //       // assert
  //       console.log('result', result);
  //       expect(result.type).to.equal(null);
  //       expect(result.message.name).to.deep.equal(allProductsModel[0]);
  //     });
  // });
  
  afterEach(function () {
    sinon.restore();
  });
});
