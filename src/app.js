const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const logger = require('./config/logger');
const apiRoutes = require('./routes/api');
const { errorHandler, requestLogger } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // límite de 100 requests por ventana de tiempo
    message: {
        success: false,
        cod_error: '429',
        message_error: 'Demasiadas solicitudes. Intente nuevamente más tarde.',
        data: null
    }
});

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
app.use(limiter);

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use(requestLogger);

// Rutas
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'ePayco REST Client API',
        version: '1.0.0',
        endpoints: {
            'POST /api/registrar': 'Registra un nuevo cliente',
            'POST /api/recargar': 'Recarga saldo a la billetera',
            'POST /api/pagar': 'Inicia proceso de pago',
            'POST /api/confirmar-pago': 'Confirma el pago con token',
            'GET/POST /api/consultar-saldo': 'Consulta el saldo actual'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Servicio funcionando correctamente',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes
app.use('/api', apiRoutes);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        cod_error: '404',
        message_error: 'Endpoint no encontrado',
        data: null
    });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    logger.info(`🚀 Servidor REST Client iniciado en puerto ${PORT}`);
    logger.info(`📋 Documentación disponible en: http://localhost:${PORT}`);
    logger.info(`🏥 Health check en: http://localhost:${PORT}/health`);
    logger.info(`🔗 SOAP Server URL: ${process.env.SOAP_SERVER_URL}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

module.exports = app;
