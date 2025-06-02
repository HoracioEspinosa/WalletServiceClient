const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    logger.error('Error no manejado:', err);
    
    // Error de conexión SOAP
    if (err.message && err.message.includes('SOAP')) {
        return res.status(503).json({
            success: false,
            cod_error: '503',
            message_error: 'Servicio SOAP no disponible',
            data: null
        });
    }
    
    // Error genérico del servidor
    res.status(500).json({
        success: false,
        cod_error: '500',
        message_error: 'Error interno del servidor',
        data: null
    });
};

const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    });
    
    next();
};

module.exports = {
    errorHandler,
    requestLogger
};
