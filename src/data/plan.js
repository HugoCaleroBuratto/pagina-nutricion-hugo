/**
 * Plan de dieta de 5 comidas diarias.
 *
 * Los pesos son en CRUDO (raw) por día, salvo donde se indica.
 * Para el arroz de la Comida 2 (150g cocido): se guarda el equivalente crudo = 150 / 2.5 = 60g.
 * Pollo y nueces combinados de las comidas que los repiten.
 */
export const DIET_PLAN = [
  // ── Comida 1: Desayuno ──────────────────────────────────────────────────
  // 7 claras + 3 yemas (revueltos o hervidos)
  { foodId: 'egg_white',      inputType: 'units',  inputValue: 7,   meal: '🌅 Comida 1 — Desayuno' },
  { foodId: 'egg_yolk',       inputType: 'units',  inputValue: 3,   meal: '🌅 Comida 1 — Desayuno' },
  // 3 discos de arroz diet sin azúcar
  { foodId: 'rice_cake_diet', inputType: 'units',  inputValue: 3,   meal: '🌅 Comida 1 — Desayuno' },
  // 150g fruta trozada
  { foodId: 'mixed_fruit',    inputType: 'weight', inputValue: 150, meal: '🌅 Comida 1 — Desayuno' },
  // 30g nueces (comida 1) + 20g nueces (comida 4) = 50g/día
  { foodId: 'walnuts',        inputType: 'weight', inputValue: 50,  meal: '🌅 Comida 1 + 🌆 Comida 4' },

  // ── Comida 2: Almuerzo ──────────────────────────────────────────────────
  // 150g pollo (comida 2) + 180g pollo (comida 4) = 330g/día
  { foodId: 'chicken_breast', inputType: 'weight', inputValue: 330, meal: '☀️ Comida 2 + 🌆 Comida 4' },
  // Arroz comida 2: 150g COCIDO → 60g crudo (÷ 2.5)
  // Arroz comida 3: 200g crudo
  // Total arroz: 260g crudo/día
  { foodId: 'white_rice',     inputType: 'weight', inputValue: 260, meal: '☀️ Comida 2 + 🌙 Comida 3' },
  // Zanahoria rallada (2 ensaladas × 100g)
  { foodId: 'carrot',         inputType: 'weight', inputValue: 200, meal: '☀️ Comida 2 + 🌙 Comida 3' },
  // 20g aceitunas verdes
  { foodId: 'green_olives',   inputType: 'weight', inputValue: 20,  meal: '☀️ Comida 2 — Almuerzo' },

  // ── Comida 3: Merienda / Cena temprana ──────────────────────────────────
  // 200g carne roja
  { foodId: 'red_meat',       inputType: 'weight', inputValue: 200, meal: '🌙 Comida 3 — Cena' },
  // 2 huevos enteros
  { foodId: 'egg',            inputType: 'units',  inputValue: 2,   meal: '🌙 Comida 3 — Cena' },

  // ── Comida 4: Merienda ───────────────────────────────────────────────────
  // 200g papa o batata (hervida o al vapor)
  { foodId: 'sweet_potato',   inputType: 'weight', inputValue: 200, meal: '🌆 Comida 4 — Merienda' },
  // 1 tomate (no perita)
  { foodId: 'tomato',         inputType: 'units',  inputValue: 1,   meal: '🌆 Comida 4 — Merienda' },

  // ── Comida 5: Cena ───────────────────────────────────────────────────────
  // 250g pescado (merluza, brótola, pejerrey, salmón, atún, langostino, mejillones)
  { foodId: 'hake',           inputType: 'weight', inputValue: 250, meal: '🌃 Comida 5 — Cena' },
  // Ensalada de hojas verdes
  { foodId: 'green_salad',    inputType: 'weight', inputValue: 150, meal: '🌃 Comida 5 — Cena' },
  // 2 tostadas integrales con aceite de oliva
  { foodId: 'integral_toast', inputType: 'units',  inputValue: 2,   meal: '🌃 Comida 5 — Cena' },
]
