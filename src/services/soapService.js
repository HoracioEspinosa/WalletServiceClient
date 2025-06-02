const soap = require('soap');
const logger = require('../config/logger');
require('dotenv').config();

class AlternativeSoapService {
    constructor() {
        this.soapUrl = process.env.SOAP_SERVER_URL || 'http://localhost:8080/soap/wsdl';
        this.client = null;
    }

    async getClient() {
        if (!this.client) {
            try {
                logger.info(`Conectando al servidor SOAP: ${this.soapUrl}`);
                
                const options = {
                    wsdl_options: {
                        timeout: 10000,
                        rejectUnauthorized: false
                    },
                    forceSoap12Headers: false
                };
                
                this.client = await soap.createClientAsync(this.soapUrl, options);
                logger.info('Cliente SOAP conectado exitosamente');
                
                // Log service details
                const description = this.client.describe();
                logger.info('Descripción del servicio:', JSON.stringify(description, null, 2));
                
                return this.client;
            } catch (error) {
                logger.error('Error al conectar con el servidor SOAP:', error);
                throw new Error('No se pudo conectar al servidor SOAP: ' + error.message);
            }
        }
        return this.client;
    }

    async makeDirectSoapCall(method, params) {
        try {
            // Create SOAP envelope manually
            const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/" xmlns:tns="http://epayco.wallet.service/">
    <soap:Body>
        <tns:${method}Request>
            ${Object.entries(params).map(([key, value]) => `<${key}>${value}</${key}>`).join('\n            ')}
        </tns:${method}Request>
    </soap:Body>
</soap:Envelope>`;

            logger.info('Enviando SOAP envelope:', soapEnvelope);

            const response = await fetch(this.soapUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml; charset=utf-8',
                    'SOAPAction': method
                },
                body: soapEnvelope
            });

            const responseText = await response.text();
            logger.info('Respuesta SOAP:', responseText);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${responseText}`);
            }

            // Parse response
            return this.parseResponseXML(responseText);
        } catch (error) {
            logger.error('Error en llamada SOAP directa:', error);
            throw error;
        }
    }

    parseResponseXML(xmlString) {
        // Simple regex-based parsing for our specific response structure
        try {
            const successMatch = xmlString.match(/<success>(.*?)<\/success>/);
            const codErrorMatch = xmlString.match(/<cod_error>(.*?)<\/cod_error>/);
            const messageErrorMatch = xmlString.match(/<message_error>(.*?)<\/message_error>/);
            const dataMatch = xmlString.match(/<data>(.*?)<\/data>/s);
            
            const success = successMatch ? successMatch[1] === 'true' : false;
            const cod_error = codErrorMatch ? codErrorMatch[1] : '';
            const message_error = messageErrorMatch ? messageErrorMatch[1] : '';
            
            let data = null;
            if (dataMatch && dataMatch[1].trim()) {
                data = {};
                // Extract individual data elements
                const dataContent = dataMatch[1];
                const elementRegex = /<(\w+)>(.*?)<\/\1>/g;
                let match;
                while ((match = elementRegex.exec(dataContent)) !== null) {
                    data[match[1]] = match[2];
                }
            }
            
            return {
                success,
                cod_error,
                message_error,
                data
            };
        } catch (error) {
            logger.error('Error parsing XML response:', error);
            throw new Error('Error parsing SOAP response');
        }
    }

    async registrarCliente(clienteData) {
        try {
            logger.info('Registrando cliente via SOAP directo');
            const result = await this.makeDirectSoapCall('registrarCliente', clienteData);
            return result;
        } catch (error) {
            logger.error('Error en registrarCliente:', error);
            throw error;
        }
    }

    async recargarBilletera(recargarData) {
        try {
            logger.info('Recargando billetera via SOAP directo');
            const result = await this.makeDirectSoapCall('recargarBilletera', recargarData);
            return result;
        } catch (error) {
            logger.error('Error en recargarBilletera:', error);
            throw error;
        }
    }

    async pagar(pagoData) {
        try {
            logger.info('Realizando pago via SOAP directo');
            const result = await this.makeDirectSoapCall('pagar', pagoData);
            return result;
        } catch (error) {
            logger.error('Error en pagar:', error);
            throw error;
        }
    }

    async confirmarPago(confirmarData) {
        try {
            logger.info('Confirmando pago via SOAP directo');
            // Note: the server expects 'idSesion' but our schema uses 'id_sesion'
            const params = {
                idSesion: confirmarData.id_sesion || confirmarData.idSesion,
                token: confirmarData.token
            };
            const result = await this.makeDirectSoapCall('confirmarPago', params);
            return result;
        } catch (error) {
            logger.error('Error en confirmarPago:', error);
            throw error;
        }
    }

    async consultarSaldo(consultarData) {
        try {
            logger.info('Consultando saldo via SOAP directo');
            const result = await this.makeDirectSoapCall('consultarSaldo', consultarData);
            return result;
        } catch (error) {
            logger.error('Error en consultarSaldo:', error);
            throw error;
        }
    }
}

module.exports = new AlternativeSoapService();
