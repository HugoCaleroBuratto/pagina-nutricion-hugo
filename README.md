# 🥗 Calculadora de Alimentos

Aplicación web estática para planificar la compra semanal y quincenal de alimentos, con cálculo de equivalencias en crudo y cocido.

## ✨ Funcionalidades

- **Búsqueda de alimentos** — más de 25 alimentos predefinidos agrupados por categoría (Carnes, Cereales, Legumbres, Verduras, Huevos y lácteos, Frutas)
- **Carga por peso o por unidades** — podés ingresar `200g` de arroz o `2 tomates` directamente
- **Cálculo automático** para 1, 7 y 14 días en crudo y cocido
- **Factor de cocción por alimento** — el arroz triplica su peso (×2.5), la pechuga lo reduce (×0.75), etc.
- **Carrito de compras** — tabla con todos los ítems y totales por columna
- **Progreso de compra** — barra animada que se completa a medida que tildás los productos ya comprados 🎉
- **Alimentos personalizados** — podés agregar cualquier alimento con su propio factor de cocción
- **Imprimir / Exportar PDF** — vista limpia optimizada para impresión

## 🛠️ Stack

| Tecnología | Versión |
|---|---|
| React | 18 |
| Vite | 5 |
| Tailwind CSS | 3 |
| Lucide React | 0.441 |
| react-to-print | 3 |

## 🚀 Desarrollo local

```bash
# Instalar dependencias (requiere bun)
bun install

# Iniciar servidor de desarrollo
bun run dev        # http://localhost:5173

# Build de producción
bun run build

# Preview del build
bun run preview
```

## 📁 Estructura del proyecto

```
src/
├── data/
│   └── foods.js            # Base de datos de alimentos con emojis y factores de cocción
├── utils/
│   └── calculations.js     # Funciones puras de cálculo (crudo/cocido/días)
├── hooks/
│   └── useCart.js          # Estado del carrito + lógica de compra
└── components/
    ├── FoodSelector.jsx    # Buscador con dropdown por categoría
    ├── AddFoodForm.jsx     # Formulario peso/unidades + agregar
    ├── CartTable.jsx       # Tabla de resultados con totales
    ├── CartRow.jsx         # Fila individual con checkbox de comprado
    └── CustomFoodModal.jsx # Modal para alimento personalizado
```

## 🧮 Lógica de cálculo

```
gramos/día  = cantidad_ingresada × gramos_por_unidad  (si es por unidades)
            = cantidad_ingresada                       (si es por gramos)

crudo N días  = gramos/día × N
cocido N días = gramos/día × N × factor_cocción
```
