# 🎮 JunLovin API 🎮

## ✨ Transforma tu stream con banners personalizados ✨

JunLovin API es una herramienta sencilla pero poderosa que te permite mostrar banners rotativos en tu stream. ¡Personaliza tu transmisión y haz que se vea más profesional en segundos!

## 🚀 Características principales

- 🖼️ Muestra banners rotativos en tu stream
- ⚡ Fácil integración con OBS Studio
- 🔄 Rotación automática de banners
- ➕ Agrega nuevos banners con un simple URL
- 🎨 Personalización sencilla

## 📋 Endpoints disponibles

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/:usuario` | GET | Muestra los banners rotativos para tu stream |
| `/api/banners` | GET | Obtiene la lista de todos los banners disponibles |
| `/api/agregarbanner` | GET | Accede a la interfaz para agregar nuevos banners |
| `/api/agregar` | POST | Endpoint para subir un nuevo banner mediante URL |


## 🔧 Cómo usar JunLovin API

### 1️⃣ Mostrar banners en tu stream

Simplemente accede a:

```
http://localhost:3000/api/TU_NOMBRE_DE_USUARIO
```

Reemplaza TU_NOMBRE_DE_USUARIO con tu nombre de usuario de Twitch o cualquier identificador que prefieras.

### 2️⃣ Agregar nuevos banners

1. Accede a la página de administración:

```
http://localhost:300/api/agregarbanner
```

2. Ingresa la URL de la imagen que deseas usar como banner
3. Haz clic en "Agregar"
4. ¡Listo! Tu nuevo banner aparecerá automáticamente en la rotación

## 🎬 Integración con OBS Studio

Integrar JunLovin API con OBS es muy sencillo:

1. En OBS, haz clic en "+" en la sección de fuentes
2. Selecciona "Navegador"
3. Dale un nombre a la fuente (por ejemplo, "Banners JunLovin")
4. En la URL, ingresa: `http://localhost:3000/api/TU_NOMBRE_DE_USUARIO`
6. Haz clic en "Aceptar"

¡Y eso es todo! Ahora tus banners aparecerán en tu stream y rotarán automáticamente.

## 🎥 Demostración

Para ver JunLovin API en acción, mira este video de demostración:

https://github.com/user-attachments/assets/c8cdd4bf-a3ca-43b6-8d5f-23cedc8dfd89

## 🛠️ Requisitos técnicos

- Node.js
- npm o yarn
- Navegador web moderno

## 📝 Licencia

ISC License

## 👨‍💻 ¿Preguntas o sugerencias?

¡No dudes en abrir un issue o contactarme directamente!
