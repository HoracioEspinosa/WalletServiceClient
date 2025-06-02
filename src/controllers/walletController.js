const soapService = require('../services/soapService');
const logger = require('../config/logger');

class WalletController {
    async registrarCliente(req, res, next) {
        try {
            logger.info('Iniciando registro de cliente');
            const result = await soapService.registrarCliente(req.body);
            
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async recargarBilletera(req, res, next) {
        try {
            logger.info('Iniciando recarga de billetera');
            const result = await soapService.recargarBilletera(req.body);
            
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async pagar(req, res, next) {
        try {
            logger.info('Iniciando proceso de pago');
            const result = await soapService.pagar(req.body);
            
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async confirmarPago(req, res, next) {
        try {
            logger.info('Confirmando pago');
            const result = await soapService.confirmarPago(req.body);
            
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async consultarSaldo(req, res, next) {
        try {
            logger.info('Consultando saldo');
            
            // Para GET, los parámetros vienen en query, para POST en body
            const data = req.method === 'GET' ? req.query : req.body;
            const result = await soapService.consultarSaldo(data);
            
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new WalletController();
