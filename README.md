# DevHub - The Ultimate Developer Toolkit 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan)](https://tailwindcss.com/)

**DevHub** es una suite de herramientas "todo en uno" diseñada meticulosamente para desarrolladores web modernos. Reúne más de 15 utilidades esenciales en una sola aplicación web rápida, hermosa y fácil de usar.

Ya no necesitas buscar en Google "base64 encoder", "box shadow generator" o "json formatter" constantemente. DevHub centraliza todo con una experiencia de usuario premium, modo oscuro nativo y una interfaz fluida.

---

## ✨ Características Principales

DevHub está organizado en cuatro categorías de potencia:

### 1. 🛠️ Code Utilities (Utilidades de Código)
Herramientas diarias para manipular y transformar datos.
*   **Diff Viewer**: Compara dos bloques de texto o código lado a lado. Resalta diferencias (inserciones y eliminaciones) línea por línea.
*   **Base64 Converter**: Codifica y decodifica strings en Base64 al instante. Maneja errores de formato gracefully.
*   **UUID Generator**: Genera identificadores únicos masivamente. Soporta **UUID v4**, **NanoID** (más corto, seguro para URLs) y **CUID**.
*   **Cron Job Parser**: Escribe o pega una expresión CRON (ej: `*/5 * * * *`) y obtén una descripción en lenguaje natural ("Cada 5 minutos").
*   **JSON to TOON**: Convierte objetos JSON a un formato experimental optimizado para tokens (Token-Oriented Object Notation), ideal para ahorrar costes al usar LLMs.

### 2. 📡 Redes y API
Depura y construye interacciones de red sin salir de la app.
*   **CURL to Code**: Pega un comando CURL de tu terminal y conviértelo automáticamente a código listo para usar en **JavaScript (fetch)**, **Axios** o **Python (requests)**.
*   **HTTP Status Explorer**: Una guía visual y buscable de todos los códigos de estado HTTP (200, 404, 500, etc.), ilustrada con imágenes de **http.cat** o **http.dog**.
*   **JWT Decoder**: Inspecciona el contenido (payload) de tus JSON Web Tokens sin necesidad de la clave secreta (solo decodificación, no verificación).

### 3. 🎨 UI & CSS Avanzado
Diseña componentes visuales complejos con controles interactivos.
*   **CSS Grid Generator**: Constructor visual de layouts. Define filas, columnas y gaps arrastrando sliders. Exporta código en **CSS**, **SCSS** o **Tailwind**.
*   **Keycode Info**: Presiona cualquier tecla para ver su `event.key`, `event.code`, `event.which` y modificadores. Vital para desarrollar juegos o atajos de teclado.
*   **Clip Path Maker**: Crea formas complejas de recorte (polígonos) arrastrando puntos sobre un lienzo. Genera el código CSS `clip-path` automáticamente.
*   **Box Shadow Generator**: Crea sombras realistas y multicapa (layered shadows) que no son posibles con generadores simples.
*   **Gradient Mate**: Diseñador de gradientes lineales y radiales con múltiples paradas de color.
*   **Border Radius**: Visualizador avanzado que permite crear formas orgánicas ("blobs") usando las 8 propiedades de radio de borde.

### 4. 📝 Contenido y SEO
Herramientas para creadores de contenido y optimización.
*   **Markdown Live**: Editor de Markdown en tiempo real con vista previa idéntica a GitHub. ¡Incluye un generador de README con IA!
*   **Meta Tag Generator**: Crea las etiquetas `<meta>` sociales (Open Graph, Twitter Cards) perfectas para tu sitio web.
*   **Lorem Ipsum**: Generador de texto de relleno altamente configurable (párrafos, oraciones, palabras).

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una estructura modular y escalable:

```
src/
├── components/       # Componentes UI reutilizables (Botones, Grid, Layout)
├── context/          # Estados globales (Tema, Idioma)
├── features/         # Módulos principales de la aplicación
│   ├── code-utils/   # Lógica de herramientas de código
│   ├── css-ui/       # Generadores visuales CSS
│   ├── data-converters/ # Transformadores de datos
│   ├── network/      # Herramientas de red
│   └── seo-content/  # Herramientas de contenido
├── pages/            # Vistas principales (Home, ToolDetails)
└── utils/            # Funciones auxiliares y constantes
```

## � Instalación Local

Para ejecutar DevHub en tu máquina:

1.  **Requisitos**: Node.js 18+ y npm/yarn/pnpm.
2.  **Clonar**:
    ```bash
    git clone https://github.com/tu-usuario/devhub.git
    cd devhub
    ```
3.  **Instalar**:
    ```bash
    npm install
    ```
4.  **Desarrollo**:
    ```bash
    npm run dev
    ```
    Abre `http://localhost:5173` en tu navegador.

## 🔮 Roadmap Futuro

*   [ ] **Cuenta de Usuario**: Guardar configuraciones y snippets favoritos.
*   **Más Herramientas**:
    *   [ ] SQL Formatter
    *   [ ] Expresiones Regulares (Visualizador)
    *   [ ] Conversor de Unidades (PX a REM)
*   **Temas Personalizados**: Más allá del modo oscuro/claro.

---

**Licencia**: Este proyecto es Open Source bajo la licencia MIT. Siéntete libre de usarlo, modificarlo y compartirlo.
