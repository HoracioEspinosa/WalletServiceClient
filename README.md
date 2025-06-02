# ePayco REST Client

Cliente REST que actúa como intermediario entre el frontend/Postman y el servicio SOAP de ePayco.

## 🚀 Características

- **Express.js**: Framework web rápido y minimalista
- **Cliente SOAP**: Consume servicios del servidor SOAP
- **Validación**: Validación robusta de datos de entrada con Joi
- **Logging**: Sistema de logs con Winston
- **Seguridad**: Helmet, CORS, Rate limiting
- **Manejo de errores**: Middleware centralizado de manejo de errores

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start
```

## 🔧 Configuración

Edita el archivo `.env` con la configuración apropiada:

```env
PORT=3000
SOAP_SERVER_URL=http://localhost:8080/soap
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

## 📋 Endpoints API

### Base URL: `http://localhost:3000`

| Endpoint               | Método    | Descripción                   |
| ---------------------- | --------- | ----------------------------- |
| `/`                    | GET       | Información de la API         |
| `/health`              | GET       | Health check del servicio     |
| `/api/registrar`       | POST      | Registra un nuevo cliente     |
| `/api/recargar`        | POST      | Recarga saldo a la billetera  |
| `/api/pagar`           | POST      | Inicia proceso de pago        |
| `/api/confirmar-pago`  | POST      | Confirma el pago con token    |
| `/api/consultar-saldo` | GET/POST  | Consulta el saldo actual      |

## 📝 Ejemplos de uso

### 1. Registrar Cliente

```bash
curl -X POST http://localhost:3000/api/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "documento": "12345678",
    "nombres": "Juan Pérez",
    "email": "juan@email.com",
    "celular": "3001234567"
  }'
```

### 2. Recargar Billetera

```bash
curl -X POST http://localhost:3000/api/recargar \
  -H "Content-Type: application/json" \
  -d '{
    "documento": "12345678",
    "celular": "3001234567",
    "valor": 100.50
  }'
```

### 3. Realizar Pago

```bash
curl -X POST http://localhost:3000/api/pagar \
  -H "Content-Type: application/json" \
  -d '{
    "documento": "12345678",
    "celular": "3001234567",
    "valor": 50.00
  }'
```

### 4. Confirmar Pago

```bash
curl -X POST http://localhost:3000/api/confirmar-pago \
  -H "Content-Type: application/json" \
  -d '{
    "id_sesion": "session_123456",
    "token": "123456"
  }'
```

### 5. Consultar Saldo (GET)

```bash
curl "http://localhost:3000/api/consultar-saldo?documento=12345678&celular=3001234567"
```

### 6. Consultar Saldo (POST)

```bash
curl -X POST http://localhost:3000/api/consultar-saldo \
  -H "Content-Type: application/json" \
  -d '{
    "documento": "12345678",
    "celular": "3001234567"
  }'
```

## 🏗️ Estructura del Proyecto

```
src/
├── app.js                 # Aplicación principal
├── config/
│   └── logger.js         # Configuración de logging
├── controllers/
│   └── walletController.js # Controladores de la billetera
├── middleware/
│   ├── errorHandler.js   # Manejo de errores
│   └── validation.js     # Middleware de validación
├── routes/
│   └── api.js           # Rutas de la API
├── services/
│   └── soapService.js   # Cliente SOAP
└── validators/
    └── schemas.js       # Esquemas de validación
```

## 🔒 Seguridad

- **Helmet**: Protección de headers HTTP
- **CORS**: Configuración de CORS
- **Rate Limiting**: Límite de solicitudes por IP
- **Validación**: Validación estricta de datos de entrada

## 📊 Logging

Los logs se almacenan en:
- `logs/combined.log`: Todos los logs
- `logs/error.log`: Solo errores
- Console: Salida en tiempo real

## 🚦 Health Check

Visita `http://localhost:3000/health` para verificar el estado del servicio.

## 🔄 Dependencias

### Dependencias de Producción

- **express**: Framework web
- **soap**: Cliente SOAP
- **cors**: Habilitación de CORS
- **helmet**: Seguridad HTTP
- **express-rate-limit**: Rate limiting
- **winston**: Sistema de logging
- **joi**: Validación de datos
- **dotenv**: Variables de entorno

### Dependencias de Desarrollo

- **nodemon**: Reinicio automático en desarrollo

## 🐛 Depuración

Para habilitar logs de depuración, establece `LOG_LEVEL=debug` en tu archivo `.env`.

## ⚠️ Notas Importantes

1. Este servicio **NO** se conecta directamente a la base de datos
2. Todas las operaciones se realizan a través del servidor SOAP
3. Asegúrate de que el servidor SOAP esté ejecutándose antes de iniciar este cliente
4. El servidor SOAP debe estar disponible en la URL configurada en `SOAP_SERVER_URL`
