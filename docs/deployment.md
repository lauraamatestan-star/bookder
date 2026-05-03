# Despliegue - Bookder

## Frontend → Vercel

### Pasos

1. **Preparar el proyecto**
   ```bash
   cd client
   npm run build
   ```

2. **Subir a GitHub**
   - Crear repositorio en GitHub
   - Push del código: `git add . && git commit -m "Deploy" && git push`

3. **Conectar a Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Importar repositorio de GitHub
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Variables de entorno**
   ```
   VITE_API_URL=https://bookder-api.onrender.com/api
   ```

5. **Deploy** → Listo! 🎉

---

## Backend → Render

### Pasos

1. **Preparar el proyecto**
   - Asegurar que `package.json` tenga `"start": "node index.js"`

2. **Subir a GitHub**
   - El backend debe estar en la misma repo o en una diferente

3. **Crear servicio en Render**
   - Ir a [render.com](https://render.com)
   - New → Web Service
   - Conectar repositorio
   - Root directory: `server`

4. **Configuración**
   - Build command: (vacío)
   - Start command: `node index.js`
   - Environment: `Node`

5. **Variables de entorno**
   ```
   PORT=3000
   ```

6. **Deploy** → Obtendrás una URL como: `https://bookder-api.onrender.com`

---

## Verificación

| Componente | URL |
|------------|-----|
| Frontend | `https://bookder.vercel.app` |
| API | `https://bookder-api.onrender.com/api/books` |
| Health | `https://bookder-api.onrender.com/health` |

---

## Notas

- El frontend en Vercel debe apuntar a la URL del backend en Render
- Usar CORS en el backend para permitir peticiones del frontend
- En desarrollo: `http://localhost:3000` para el backend