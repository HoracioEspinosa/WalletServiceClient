#!/bin/bash

# Ejemplos de comandos curl para probar el cliente REST de ePayco
# Asegúrate de que el servidor esté ejecutándose en http://localhost:3000

BASE_URL="http://localhost:3000"

echo "🧪 Ejemplos de pruebas para el cliente REST de ePayco"
echo "=================================================="
echo ""

echo "1. Health Check"
echo "curl $BASE_URL/health"
echo ""

echo "2. Información de la API"
echo "curl $BASE_URL"
echo ""

echo "3. Registrar Cliente"
echo "curl -X POST $BASE_URL/api/registrar \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{"
echo "    \"documento\": \"12345678\","
echo "    \"nombres\": \"Juan Pérez\","
echo "    \"email\": \"juan@email.com\","
echo "    \"celular\": \"3001234567\""
echo "  }'"
echo ""

echo "4. Recargar Billetera"
echo "curl -X POST $BASE_URL/api/recargar \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{"
echo "    \"documento\": \"12345678\","
echo "    \"celular\": \"3001234567\","
echo "    \"valor\": 100.50"
echo "  }'"
echo ""

echo "5. Realizar Pago"
echo "curl -X POST $BASE_URL/api/pagar \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{"
echo "    \"documento\": \"12345678\","
echo "    \"celular\": \"3001234567\","
echo "    \"valor\": 50.00"
echo "  }'"
echo ""

echo "6. Confirmar Pago"
echo "curl -X POST $BASE_URL/api/confirmar-pago \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{"
echo "    \"id_sesion\": \"session_123456\","
echo "    \"token\": \"123456\""
echo "  }'"
echo ""

echo "7. Consultar Saldo (GET)"
echo "curl \"$BASE_URL/api/consultar-saldo?documento=12345678&celular=3001234567\""
echo ""

echo "8. Consultar Saldo (POST)"
echo "curl -X POST $BASE_URL/api/consultar-saldo \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{"
echo "    \"documento\": \"12345678\","
echo "    \"celular\": \"3001234567\""
echo "  }'"
echo ""

echo "=================================================="
echo "💡 Tip: Copia y pega estos comandos en tu terminal para probarlos"
echo "⚠️  Asegúrate de que el servidor SOAP esté ejecutándose en http://localhost:8080/soap/wsdl"
