const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsServices = require('../../../src/services');
const productController = require('../../../src/controllers');

const { productListMock, productMock, newProductMock } = require('./mocks/product.controller.mock');

describe('Teste de unidade do productController', function () {
  describe('Listando os produtos', function() {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices.productsServices, 'getAllProducts')
        .resolves({ type: null, message: productListMock });

      // act
      await productController.productController.listProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productListMock);
    });
  });
  
 describe('Buscando um produto por ID', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices.productsServices, 'getProductById')
        .resolves({ type: null, message: newProductMock });
      // Act
      await productController.productController.getProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('ao passar um id inválido deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'aaa' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices.productsServices, 'getProductById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await productController.productController.getProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ type: 'INVALID_VALUE', message: '"id" must be a number' });
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 9999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsServices.productsServices, 'getProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // Act
      await productController.productController.getProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    });

  });

describe('Cadastrando um novo produto', function () {
    it('ao enviar dados válidos deve salvar com sucesso!', async function () {
      // Arrange
      const res = {};
      const req = {
        body: productMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsServices.productsServices, 'insertProduct')
        .resolves({ type: null, message: newProductMock });

      // Act
      await productController.productController.createProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});