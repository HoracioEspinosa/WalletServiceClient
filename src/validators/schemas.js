const Joi = require('joi');

const registrarClienteSchema = Joi.object({
    documento: Joi.string().required().min(1).max(20),
    nombres: Joi.string().required().min(1).max(255),
    email: Joi.string().email().required().max(255),
    celular: Joi.string().required().min(10).max(15)
});

const recargarBilleteraSchema = Joi.object({
    documento: Joi.string().required().min(1).max(20),
    celular: Joi.string().required().min(10).max(15),
    valor: Joi.number().positive().required()
});

const pagarSchema = Joi.object({
    documento: Joi.string().required().min(1).max(20),
    celular: Joi.string().required().min(10).max(15),
    valor: Joi.number().positive().required()
});

const confirmarPagoSchema = Joi.object({
    id_sesion: Joi.string().required(),
    token: Joi.string().required().length(6)
});

const consultarSaldoSchema = Joi.object({
    documento: Joi.string().required().min(1).max(20),
    celular: Joi.string().required().min(10).max(15)
});

module.exports = {
    registrarClienteSchema,
    recargarBilleteraSchema,
    pagarSchema,
    confirmarPagoSchema,
    consultarSaldoSchema
};
