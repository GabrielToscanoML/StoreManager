const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesServices } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { allSalesMock, saleByIdMock, createSaleMock, saleCreatedMock } = require('./mocks/sales.controller.mock');

describe('Teste de unidade do salesController', function () {
  describe('Listando as vendas', function() {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'getAllSales')
        .resolves({ type: null, message: allSalesMock });
      // act
      await salesController.listSales(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesMock);
    });
  });
  
 describe('Buscando uma lista por ID', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'getSaleById')
        .resolves({ type: null, message: saleByIdMock });
      // Act
      await salesController.listSaleById(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleByIdMock);
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
        .stub(salesServices, 'getSaleById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await salesController.listSaleById(req, res);

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
        .stub(salesServices, 'getSaleById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      // Act
      await salesController.listSaleById(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
    });

  });

describe('Cadastrando uma nova venda', function () {
    it('ao enviar dados válidos deve salvar com sucesso', async function () {
      // Arrange
      const res = {};
      const req = {
        body: createSaleMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesServices, 'insertSale')
        .resolves(saleCreatedMock);

      // Act
      const teste = await salesController.createSale(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreatedMock);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});