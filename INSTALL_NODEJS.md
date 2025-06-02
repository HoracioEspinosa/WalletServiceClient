# Instalación de Node.js en macOS

## Opción 1: Usando Homebrew (Recomendado)

```bash
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node

# Verificar instalación
node --version
npm --version
```

## Opción 2: Usando el instalador oficial

1. Visita https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador .pkg
4. Sigue las instrucciones del instalador

## Opción 3: Usando nvm (Node Version Manager)

```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reiniciar terminal o ejecutar:
source ~/.bash_profile

# Instalar la última versión LTS de Node.js
nvm install --lts
nvm use --lts

# Verificar instalación
node --version
npm --version
```

## Después de instalar Node.js

1. Ve al directorio del proyecto:
   ```bash
   cd /Users/horacio/Desktop/epayco/Client
   ```

2. Ejecuta el script de configuración:
   ```bash
   ./setup.sh
   ```

3. O instala manualmente las dependencias:
   ```bash
   npm install
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

## Verificación de la instalación

El servidor debe estar disponible en: http://localhost:3000

Health check: http://localhost:3000/health
