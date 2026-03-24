# 🏢 Web Asambleas - Ecosistema de Gestión de Propiedad Horizontal

<p align="center">
  <img src="https://img.shields.io/badge/Status-Producción-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Architecture-Monorepo-orange?style=for-the-badge" alt="Architecture">
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" alt="Deploy">
  <img src="https://img.shields.io/badge/Stack-React%20%2B%20Vite-646CFF?style=for-the-badge&logo=vite" alt="Stack">
</p>

## 🌐 Portafolio de Despliegues (Live)
Esta solución escala a múltiples copropiedades mediante un único repositorio centralizado. Puedes ver algunos ejemplos activos aquí:
- 📍 **Loyola 32**: [web-asambleas-loyola-32.vercel.app](https://web-asambleas-loyola-32.vercel.app/)
- 📍 **Esquina Real**: [asamblea-residencial-esquina.vercel.app](https://asamblea-residencial-esquina.vercel.app/)
- 📍 **Gran Murano**: [web-gran-murano.vercel.app](https://web-gran-murano.vercel.app/)
- 📍 **Jardines Morasurco**: [asamblea-jardines-morasurco.vercel.app](https://asamblea-jardines-morasurco.vercel.app/)

---

## 📌 Visión General
Desarrollé esta plataforma como una **solución tecnológica de alta fidelidad** para contadores y administradores de propiedad horizontal en Colombia. El sistema automatiza el registro en tiempo real de Asambleas Generales, optimizando la toma de decisiones y garantizando la validez legal de los procesos mediante herramientas digitales avanzadas.

## 🚀 Características Principales (Core Features)
* **Control de Quórum en Vivo**: Cálculo automático de coeficientes de copropiedad con validación de mayoría deliberatoria en tiempo real.
* **Gestión de Orden del Día**: Seguimiento dinámico de puntos clave, desde verificación de asistencia hasta proposiciones y varios.
* **Módulo de Elecciones Interactivo**: Sistema para la postulación y elección de dignatarios, Consejo de Administración y Comité de Convivencia.
* **Motor de Impresión PDF**: Generador de actas legalmente válidas que consolida toda la información recopilada en un documento final optimizado.
* **Dashboard Financiero**: Visualización interactiva de estados financieros, presupuestos, informes de seguros y matriz de contratos.

## 🛠️ Desafíos Técnicos y Soluciones
- **Arquitectura Monorepo**: Estructura escalable donde +10 edificios comparten lógica de componentes pero mantienen configuraciones y despliegues independientes.
- **Optimización de Despliegue**: Configuración en **Vercel** usando *Root Directories* específicos y *Output Directories* personalizados (`dist`) por proyecto.
- **UI/UX Tematizada**: Sistema basado en **Tailwind CSS** que permite adaptar la identidad visual de cada conjunto residencial sin duplicar código.
- **CI/CD Eficiente**: Flujo automatizado vinculado a una rama principal de Git para actualizaciones simultáneas en todo el ecosistema.

## 🚀 Stack Tecnológico
| Capa | Tecnología |
| :--- | :--- |
| **Frontend** | React 18 (Vite) |
| **Estilos** | Tailwind CSS (Utilidades de impresión `print:`) |
| **Iconografía** | Lucide React |
| **Gestión** | PNPM (Estructura Monorepo eficiente) |
| **Deployment** | Vercel (Multi-project Pipeline) |

## 📐 Estructura del Monorepo
```text
web-asambleas/
├── apps/                    # +10 edificios independientes
│   ├── loyola-32/           # Configuración individual
│   ├── gran-murano/         # Configuración individual
│   ├── jardines-morasurco/  # Configuración individual
│   └── valle-de-atriz/      # Configuración individual
├── shared-assets/           # Recursos visuales comunes
└── docs/                    # Documentación de asambleas

## 📦 Instalación y Uso Local

# 1. Clonar el repositorio
git clone [https://github.com/Cristian-Ipaz07/WEB-ASAMBLEAS.git](https://github.com/Cristian-Ipaz07/WEB-ASAMBLEAS.git)

# 2. Instalar dependencias globales del monorepo
pnpm install

# 3. Iniciar entorno de desarrollo para un edificio específico
cd apps/nombre-del-edificio
pnpm dev

## 👨‍💻 Sobre el Desarrollador

Nombre: Cristian Ipaz
Perfil: Ingeniería de Sistemas - UNAD (6° Semestre)
Especialidad: Ecosistemas digitales escalables y soluciones PH.

Nota para Reclutadores: 
Este repositorio demuestra mi capacidad para gestionar arquitecturas de múltiples sitios 
bajo un solo flujo de trabajo profesional, resolviendo problemas reales de la 
Propiedad Horizontal mediante software de alto impacto.