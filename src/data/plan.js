/**
 * Plan de dieta de 5 comidas diarias.
 *
 * Los pesos son en CRUDO (raw) por día, salvo donde se indica.
 * Cada ítem pertenece a UNA sola comida para que la vista agrupe correctamente.
 * Arroz Comida 2: 150g cocido → 60g crudo (÷ 2.5 cookingFactor).
 */
export const DIET_PLAN = [
  // ── Comida 1: Desayuno ──────────────────────────────────────────────────
  { foodId: 'egg_white',      inputType: 'units',  inputValue: 7,   meal: '🌅 Comida 1 — Desayuno' },
  { foodId: 'egg_yolk',       inputType: 'units',  inputValue: 3,   meal: '🌅 Comida 1 — Desayuno' },
  { foodId: 'rice_cake_diet', inputType: 'units',  inputValue: 3,   meal: '🌅 Comida 1 — Desayuno' },
  { foodId: 'mixed_fruit',    inputType: 'weight', inputValue: 150, meal: '🌅 Comida 1 — Desayuno' },
  { foodId: 'walnuts',        inputType: 'weight', inputValue: 30,  meal: '🌅 Comida 1 — Desayuno' },

  // ── Comida 2: Almuerzo ──────────────────────────────────────────────────
  { foodId: 'chicken_breast', inputType: 'weight', inputValue: 150, meal: '☀️ Comida 2 — Almuerzo' },
  { foodId: 'white_rice',     inputType: 'weight', inputValue: 60,  meal: '☀️ Comida 2 — Almuerzo' },
  { foodId: 'carrot',         inputType: 'weight', inputValue: 100, meal: '☀️ Comida 2 — Almuerzo' },
  { foodId: 'green_olives',   inputType: 'weight', inputValue: 20,  meal: '☀️ Comida 2 — Almuerzo' },

  // ── Comida 3: Cena temprana ──────────────────────────────────────────────
  { foodId: 'red_meat',       inputType: 'weight', inputValue: 200, meal: '🌙 Comida 3 — Cena temprana' },
  { foodId: 'egg',            inputType: 'units',  inputValue: 2,   meal: '🌙 Comida 3 — Cena temprana' },
  { foodId: 'white_rice',     inputType: 'weight', inputValue: 200, meal: '🌙 Comida 3 — Cena temprana' },
  { foodId: 'carrot',         inputType: 'weight', inputValue: 100, meal: '🌙 Comida 3 — Cena temprana' },

  // ── Comida 4: Merienda ───────────────────────────────────────────────────
  { foodId: 'chicken_breast', inputType: 'weight', inputValue: 180, meal: '🌆 Comida 4 — Merienda' },
  { foodId: 'sweet_potato',   inputType: 'weight', inputValue: 200, meal: '🌆 Comida 4 — Merienda' },
  { foodId: 'tomato',         inputType: 'units',  inputValue: 1,   meal: '🌆 Comida 4 — Merienda' },
  { foodId: 'walnuts',        inputType: 'weight', inputValue: 20,  meal: '🌆 Comida 4 — Merienda' },

  // ── Comida 5: Cena ───────────────────────────────────────────────────────
  { foodId: 'hake',           inputType: 'weight', inputValue: 250, meal: '🌃 Comida 5 — Cena' },
  { foodId: 'green_salad',    inputType: 'weight', inputValue: 150, meal: '🌃 Comida 5 — Cena' },
  { foodId: 'integral_toast', inputType: 'units',  inputValue: 2,   meal: '🌃 Comida 5 — Cena' },
]
