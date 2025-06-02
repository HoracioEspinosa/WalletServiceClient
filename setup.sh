#!/bin/bash

echo "🚀 Configurando el cliente REST de ePayco..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado."
    echo "📦 Por favor, instala Node.js desde: https://nodejs.org/"
    echo "📋 Versión recomendada: Node.js 18 LTS o superior"
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"
echo "✅ npm $(npm --version) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Crear directorio de logs
mkdir -p logs

echo ""
echo "🎉 Configuración completada!"
echo ""
echo "📋 Para iniciar el servidor:"
echo "   npm run dev    # Modo desarrollo"
echo "   npm start      # Modo producción"
echo ""
echo "🔗 El servidor estará disponible en: http://localhost:3000"
echo "🏥 Health check en: http://localhost:3000/health"
echo ""
echo "⚠️  Asegúrate de que el servidor SOAP esté ejecutándose en:"
echo "   http://localhost:8080/soap/wsdl"
