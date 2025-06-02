const express = require('express');
const walletController = require('../controllers/walletController');
const validate = require('../middleware/validation');
const {
    registrarClienteSchema,
    recargarBilleteraSchema,
    pagarSchema,
    confirmarPagoSchema,
    consultarSaldoSchema
} = require('../validators/schemas');

const router = express.Router();

// POST /api/registrar - Registra un nuevo cliente
router.post('/registrar', 
    validate(registrarClienteSchema), 
    walletController.registrarCliente
);

// POST /api/recargar - Recarga saldo a la billetera
router.post('/recargar', 
    validate(recargarBilleteraSchema), 
    walletController.recargarBilletera
);

// POST /api/pagar - Inicia proceso de pago
router.post('/pagar', 
    validate(pagarSchema), 
    walletController.pagar
);

// POST /api/confirmar-pago - Confirma el pago con token
router.post('/confirmar-pago', 
    validate(confirmarPagoSchema), 
    walletController.confirmarPago
);

// GET/POST /api/consultar-saldo - Consulta el saldo actual
router.get('/consultar-saldo', 
    (req, res, next) => {
        // Validar query params para GET
        const { error } = consultarSaldoSchema.validate(req.query);
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({
                success: false,
                cod_error: '400',
                message_error: `Parámetros de consulta inválidos: ${errorMessage}`,
                data: null
            });
        }
        next();
    },
    walletController.consultarSaldo
);

router.post('/consultar-saldo', 
    validate(consultarSaldoSchema), 
    walletController.consultarSaldo
);

module.exports = router;
