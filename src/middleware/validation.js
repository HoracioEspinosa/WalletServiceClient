const logger = require('../config/logger');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            logger.warn(`Validación fallida: ${errorMessage}`);
            
            return res.status(400).json({
                success: false,
                cod_error: '400',
                message_error: `Datos de entrada inválidos: ${errorMessage}`,
                data: null
            });
        }
        
        next();
    };
};

module.exports = validate;
