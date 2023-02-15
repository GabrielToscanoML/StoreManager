const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models');
const productsServices = require('../../../src/services');

const mock = require('./mocks/product.service.mock');

describe('Verificando service products', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModel.productsModel, 'getAllProducts').resolves(mock.allProducts);
      // act
      const result = await productsServices.productsServices.getAllProducts();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(mock.allProducts);
    });
  });
  
 describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await productsServices.productsServices.getProductById('a');
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productsModel.productsModel, 'getProductById').resolves(undefined);
      // act
      const result = await productsServices.productsServices.getProductById(1);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(productsModel.productsModel, 'getProductById').resolves(mock.allProducts[0]);
      // act
      const result = await productsServices.productsServices.getProductById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mock.allProducts[0]);
    });
  });

describe('cadastro de um produto com valores inválidos', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      // act
      const result = await productsServices.productsServices.insertProduct(mock.invalidName);
      // assert
      expect(result.type).to.equal('INVALID_NAME');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
});

describe('cadastro de um produto com valores válidos', function () {
    it('retorna o ID do produto cadastrado', async function () {
      // arrange
      sinon.stub(productsModel.productsModel, 'insertProduct').resolves(1);
      sinon.stub(productsModel.productsModel, 'getProductById').resolves(mock.allProducts[0]);
      // act
      const result = await productsServices.productsServices.insertProduct({name: mock.validName});
      // assert

      const allProductsModel = await productsModel.productsModel.getAllProducts();

      expect(result.type).to.equal(null);
      expect(result.message.id).to.deep.equal(allProductsModel.length + 1);
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });
