# AgenteCOS

## Configuración

La URL del webhook puede configurarse mediante la variable de entorno `VITE_WEBHOOK_URL`.

```bash
VITE_WEBHOOK_URL=http://localhost:5678/webhook/2c8e40bc-d18d-458e-9d02-6ca7be1eb19c/chat npm run dev
```

También puedes copiar `.env.example` a `.env` y ajustar el valor allí. Si no se define ninguna variable, se utilizará por defecto `http://localhost:5678/webhook/2c8e40bc-d18d-458e-9d02-6ca7be1eb19c/chat`.

## Pruebas

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Ejecuta la suite de pruebas:
   ```bash
   npm test
   ```
