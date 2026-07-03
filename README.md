# ZZZ Damage Calculator - Web Application

Aplicación web para calcular y comparar builds de Zenless Zone Zero con ranking global de usuarios.

## 🎮 Características

- ✅ Ingreso de UID para obtener personajes automáticamente desde Enka Network API
- ✅ Selección visual de DPS desde el showcase del usuario
- ✅ Análisis completo del build con comparación vs óptimo
- ✅ Cálculo de daño basado en substats reales
- ✅ Interfaz cyberpunk/futurista estilo ZZZ

## 📁 Estructura del Proyecto

```
zzz-web/
├── frontend/
│   └── index.html          # Aplicación React completa
├── backend/
│   ├── main.py             # API FastAPI
│   └── requirements.txt    # Dependencias Python
└── README.md
```

## 🚀 Instalación

### Prerequisitos

- Python 3.8+
- Navegador web moderno (Chrome, Firefox, Edge)

### Paso 1: Instalar dependencias del backend

```bash
cd backend
pip install -r requirements.txt
```

### Paso 2: Copiar archivos del sistema de cálculo

Copia todos los archivos Python existentes de tu calculadora al directorio `backend/`:

```
backend/
├── main.py                    # (ya existe)
├── data_structures.py         # ← COPIAR
├── stats_calculator.py        # ← COPIAR
├── damage_calculator.py       # ← COPIAR
├── substats_optimizer.py      # ← COPIAR
├── api_data.py                # ← COPIAR
├── api_mappings.py            # ← COPIAR
├── builds_predefinidos.py     # ← COPIAR
├── api_calculator.py          # ← COPIAR
└── comparador.py              # ← COPIAR
```

## ▶️ Ejecución

### 1. Iniciar el backend

```bash
cd backend
python main.py
```

El servidor estará disponible en: `http://localhost:8000`

### 2. Abrir el frontend

Abre el archivo `frontend/index.html` directamente en tu navegador, o usa un servidor local:

```bash
cd frontend
python -m http.server 3000
```

Luego accede a: `http://localhost:3000`

## 🎯 Uso de la Aplicación

### 1️⃣ Ingresar UID

- Ingresa tu UID de ZZZ
- Click en "CONFIRM"
- La aplicación obtendrá automáticamente tus personajes desde Enka Network API

### 2️⃣ Seleccionar DPS

- Se mostrarán los 6 personajes de tu showcase
- Click en el personaje que quieres analizar
- Click en "CONFIRM"

### 3️⃣ Ver Resultados

La pantalla mostrará:
- **Tu Build**: Personaje, arma, gear, team
- **Estadísticas**: Substats actuales vs máximos
- **Daño**: Comparación con build perfecta
- **Porcentaje**: Tu rendimiento (0-100%)
- **Ranking**: Tu posición global (#1, #2, etc.)
- **Grade**: Calificación (S, A, B, C, D)

## 🔧 API Endpoints

### GET `/api/characters/{uid}`
Obtiene los personajes DPS del usuario.

**Response:**
```json
{
  "characters": [
    {
      "id": 1041,
      "name": "S11",
      "image": "/api/avatar-image/1041",
      "dupes": 4
    }
  ]
}
```

### GET `/api/calculate/{uid}/{dps_id}`
Calcula el build y daño del personaje.

**Response:**
```json
{
  "character": {
    "id": 1041,
    "name": "S11",
    "dupes": 4
  },
  "build": {
    "weapon": {"name": "Brimstone", "dupes": 4},
    "gear": {"set_4pc": "Inferno Metal", "set_2pc": "Puffer Electro"}
  },
  "damage": {
    "perfect": 4356758,
    "user": 3924682
  },
  "user_percentage": 90.08,
  "ranking": {
    "position": 15,
    "grade": "A"
  }
}
```

### GET `/api/ranking/{dps_name}`
Obtiene el ranking global de un personaje.

**Response:**
```json
{
  "dps_name": "S11",
  "ranking": [
    {
      "rank": 1,
      "uid": 123456789,
      "percentage": 98.5,
      "user_damage": 4287651
    }
  ]
}
```

## 🎨 Diseño

- **Fuentes**: Orbitron (títulos), Rajdhani (texto)
- **Colores**: 
  - Fondo oscuro (#0A0A0F)
  - Amarillo neón (#FFD700)
  - Naranja (#FF6B35)
- **Efectos**: Glow, animaciones, gradientes
- **Estilo**: Cyberpunk/futurista inspirado en ZZZ

## 📊 Sistema de Grades

- **S**: 95% - 100%
- **A**: 85% - 94.9%
- **B**: 75% - 84.9%
- **C**: 65% - 74.9%
- **D**: < 65%

## 🔮 Próximas Características

- [ ] Página de Ranking completa
- [ ] Comparación con otros usuarios
- [ ] Historial de builds
- [ ] Exportar/compartir builds
- [ ] Gráficos de progresión
- [ ] Recomendaciones de mejora
- [ ] Multi-idioma (ES/EN)

## 🐛 Troubleshooting

### Error: "No se encontraron personajes"
- Verifica que el UID sea correcto
- Asegúrate de tener al menos 1 personaje en tu showcase
- Verifica que Enka Network API esté disponible

### Error: "Error al calcular build"
- Verifica que todos los archivos Python estén copiados
- Revisa que `builds_predefinidos.py` tenga la configuración del personaje
- Chequea los logs del backend para más detalles

### Frontend no se conecta al backend
- Asegúrate que el backend esté corriendo en `localhost:8000`
- Verifica configuración de CORS
- Abre la consola del navegador para ver errores

## 📝 Licencia

MIT License

## 👨‍💻 Desarrollador

Calculadora desarrollada por la comunidad de ZZZ
