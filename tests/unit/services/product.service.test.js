const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { getAllProducts } = require('../../../src/models/products.model');
const { productsServices } = require('../../../src/services');

const { allProducts, invalidName, validName } = require('./mocks/product.service.mock');

describe('Verificando service products', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);
      // act
      const result = await productsServices.getAllProducts();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });
  
 describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await productsServices.getProductById('a');
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productsModel, 'getProductById').resolves(undefined);
      // act
      const result = await productsServices.getProductById(1);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(productsModel, 'getProductById').resolves(allProducts[0]);
      // act
      const result = await productsServices.getProductById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

describe('cadastro de um produto com valores inválidos', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      // act
      const result = await productsServices.insertProduct(invalidName);
      // assert
      expect(result.type).to.equal('INVALID_NAME');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
});
    
// describe('cadastro de um produto com valores válidos', function () {
//     it('retorna o ID do produto cadastrado', async function () {
//       // arrange
//       sinon.stub(productsModel, 'insertProduct').resolves(1);
//       sinon.stub(productsModel, 'getProductById').resolves(allProducts[0]);
//       // act
//       const result = await productsServices.insertProduct(validName);
//       // assert
//       expect(result.type).to.equal(null);
//       expect(result.message).to.deep.equal(allProducts[0]);
//     });
//   });
  

   afterEach(function () {
     sinon.restore();
   });
 });
