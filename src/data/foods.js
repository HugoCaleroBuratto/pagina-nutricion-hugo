/**
 * Base de datos de alimentos predefinidos.
 *
 * gramsPerUnit:  gramos por unidad (null = se pesa en gramos)
 * cookingFactor: crudo → cocido  (>1 gana peso, <1 pierde peso, =1 sin cambio)
 * kcal / protein / carbs / fat:  valores por 100 g de alimento CRUDO
 */
export const FOODS = [
  // ── Carnes ──────────────────────────────────────────────────────────────
  { id: 'chicken_breast', emoji: '🍗', name: 'Pechuga de pollo',        category: 'Carnes',            gramsPerUnit: null, cookingFactor: 0.75, kcal: 165, protein: 31.0, carbs: 0.0,  fat: 3.6  },
  { id: 'ground_beef',    emoji: '🥩', name: 'Carne vacuna molida',     category: 'Carnes',            gramsPerUnit: null, cookingFactor: 0.70, kcal: 250, protein: 26.0, carbs: 0.0,  fat: 17.0 },
  { id: 'red_meat',       emoji: '🥩', name: 'Carne roja (bife/asado)', category: 'Carnes',            gramsPerUnit: null, cookingFactor: 0.70, kcal: 250, protein: 26.0, carbs: 0.0,  fat: 17.0 },
  { id: 'pork_loin',      emoji: '🥓', name: 'Lomo de cerdo',            category: 'Carnes',            gramsPerUnit: null, cookingFactor: 0.72, kcal: 242, protein: 27.0, carbs: 0.0,  fat: 14.0 },

  // ── Pescados y mariscos ──────────────────────────────────────────────────
  { id: 'salmon',         emoji: '🐟', name: 'Salmón',                   category: 'Pescados y mariscos', gramsPerUnit: null, cookingFactor: 0.80, kcal: 208, protein: 20.0, carbs: 0.0,  fat: 13.0 },
  { id: 'tuna_can',       emoji: '🐠', name: 'Atún (lata escurrida)',    category: 'Pescados y mariscos', gramsPerUnit: null, cookingFactor: 1.00, kcal: 116, protein: 26.0, carbs: 0.0,  fat: 1.0  },
  { id: 'hake',           emoji: '🐟', name: 'Merluza',                  category: 'Pescados y mariscos', gramsPerUnit: null, cookingFactor: 0.78, kcal: 90,  protein: 18.0, carbs: 0.0,  fat: 1.5  },
  { id: 'brotola',        emoji: '🐡', name: 'Brótola',                  category: 'Pescados y mariscos', gramsPerUnit: null, cookingFactor: 0.78, kcal: 88,  protein: 17.0, carbs: 0.0,  fat: 1.5  },
  { id: 'pejerrey',       emoji: '🐠', name: 'Pejerrey',                 category: 'Pescados y mariscos', gramsPerUnit: null, cookingFactor: 0.75, kcal: 95,  protein: 19.0, carbs: 0.0,  fat: 2.0  },
  { id: 'prawn',          emoji: '🦐', name: 'Langostino',               category: 'Pescados y mariscos', gramsPerUnit: null, cookingFactor: 0.70, kcal: 85,  protein: 18.0, carbs: 1.0,  fat: 0.9  },
  { id: 'mussels',        emoji: '🦪', name: 'Mejillones',               category: 'Pescados y mariscos', gramsPerUnit: null, cookingFactor: 0.65, kcal: 86,  protein: 12.0, carbs: 4.0,  fat: 2.2  },

  // ── Cereales y granos ────────────────────────────────────────────────────
  { id: 'white_rice',     emoji: '🍚', name: 'Arroz blanco',             category: 'Cereales',          gramsPerUnit: null, cookingFactor: 2.50, kcal: 360, protein: 7.0,  carbs: 79.0, fat: 0.7  },
  { id: 'integral_rice',  emoji: '🍚', name: 'Arroz integral',           category: 'Cereales',          gramsPerUnit: null, cookingFactor: 2.30, kcal: 350, protein: 7.5,  carbs: 73.0, fat: 2.7  },
  { id: 'pasta',          emoji: '🍝', name: 'Pasta seca',               category: 'Cereales',          gramsPerUnit: null, cookingFactor: 2.20, kcal: 371, protein: 13.0, carbs: 74.0, fat: 1.5  },
  { id: 'rice_noodles',   emoji: '🍜', name: 'Fideos de arroz',          category: 'Cereales',          gramsPerUnit: null, cookingFactor: 2.00, kcal: 364, protein: 7.0,  carbs: 80.0, fat: 0.6  },
  { id: 'oats',           emoji: '🥣', name: 'Avena',                    category: 'Cereales',          gramsPerUnit: null, cookingFactor: 1.80, kcal: 389, protein: 17.0, carbs: 66.0, fat: 7.0  },
  { id: 'quinoa',         emoji: '🌾', name: 'Quinoa',                   category: 'Cereales',          gramsPerUnit: null, cookingFactor: 2.00, kcal: 368, protein: 14.0, carbs: 64.0, fat: 6.0  },
  { id: 'rice_cake_diet', emoji: '⭕', name: 'Disco de arroz diet',      category: 'Cereales',          gramsPerUnit: 10,   cookingFactor: 1.00, kcal: 387, protein: 8.0,  carbs: 82.0, fat: 3.0  },
  { id: 'integral_toast', emoji: '🍞', name: 'Tostada integral',         category: 'Cereales',          gramsPerUnit: 25,   cookingFactor: 1.00, kcal: 265, protein: 9.0,  carbs: 44.0, fat: 4.0  },

  // ── Legumbres ────────────────────────────────────────────────────────────
  { id: 'lentils',        emoji: '🫘', name: 'Lentejas',                 category: 'Legumbres',         gramsPerUnit: null, cookingFactor: 2.00, kcal: 353, protein: 26.0, carbs: 60.0, fat: 1.0  },
  { id: 'chickpeas',      emoji: '🫛', name: 'Garbanzos',                category: 'Legumbres',         gramsPerUnit: null, cookingFactor: 1.90, kcal: 364, protein: 19.0, carbs: 61.0, fat: 6.0  },
  { id: 'black_beans',    emoji: '🫘', name: 'Porotos negros',           category: 'Legumbres',         gramsPerUnit: null, cookingFactor: 1.80, kcal: 341, protein: 22.0, carbs: 63.0, fat: 1.4  },

  // ── Verduras ─────────────────────────────────────────────────────────────
  { id: 'tomato',         emoji: '🍅', name: 'Tomate',                   category: 'Verduras',          gramsPerUnit: 120,  cookingFactor: 0.85, kcal: 18,  protein: 0.9,  carbs: 3.9,  fat: 0.2  },
  { id: 'carrot',         emoji: '🥕', name: 'Zanahoria',                category: 'Verduras',          gramsPerUnit: 80,   cookingFactor: 0.85, kcal: 41,  protein: 0.9,  carbs: 10.0, fat: 0.2  },
  { id: 'broccoli',       emoji: '🥦', name: 'Brócoli',                  category: 'Verduras',          gramsPerUnit: 500,  cookingFactor: 0.80, kcal: 34,  protein: 2.8,  carbs: 7.0,  fat: 0.4  },
  { id: 'zucchini',       emoji: '🥒', name: 'Zapallito',                category: 'Verduras',          gramsPerUnit: 200,  cookingFactor: 0.85, kcal: 17,  protein: 1.2,  carbs: 3.1,  fat: 0.3  },
  { id: 'spinach',        emoji: '🥬', name: 'Espinaca',                 category: 'Verduras',          gramsPerUnit: null, cookingFactor: 0.30, kcal: 23,  protein: 2.9,  carbs: 3.6,  fat: 0.4  },
  { id: 'sweet_potato',   emoji: '🍠', name: 'Batata',                   category: 'Verduras',          gramsPerUnit: 200,  cookingFactor: 0.85, kcal: 86,  protein: 1.6,  carbs: 20.0, fat: 0.1  },
  { id: 'potato',         emoji: '🥔', name: 'Papa',                     category: 'Verduras',          gramsPerUnit: 150,  cookingFactor: 0.85, kcal: 77,  protein: 2.0,  carbs: 17.0, fat: 0.1  },
  { id: 'lettuce',        emoji: '🥬', name: 'Lechuga',                  category: 'Verduras',          gramsPerUnit: null, cookingFactor: 1.00, kcal: 15,  protein: 1.4,  carbs: 2.9,  fat: 0.2  },
  { id: 'arugula',        emoji: '🌿', name: 'Rúcula',                   category: 'Verduras',          gramsPerUnit: null, cookingFactor: 1.00, kcal: 25,  protein: 2.6,  carbs: 3.7,  fat: 0.7  },
  { id: 'radicchio',      emoji: '🥗', name: 'Radicheta',                category: 'Verduras',          gramsPerUnit: null, cookingFactor: 1.00, kcal: 20,  protein: 1.5,  carbs: 4.0,  fat: 0.3  },
  { id: 'celery',         emoji: '🌿', name: 'Apio',                     category: 'Verduras',          gramsPerUnit: null, cookingFactor: 0.90, kcal: 16,  protein: 0.7,  carbs: 3.0,  fat: 0.2  },
  { id: 'green_salad',    emoji: '🥗', name: 'Ensalada de hojas verdes', category: 'Verduras',          gramsPerUnit: null, cookingFactor: 1.00, kcal: 20,  protein: 1.5,  carbs: 3.0,  fat: 0.3  },

  // ── Huevos y lácteos ─────────────────────────────────────────────────────
  { id: 'egg',            emoji: '🥚', name: 'Huevo entero',             category: 'Huevos y lácteos', gramsPerUnit: 60,   cookingFactor: 1.00, kcal: 155, protein: 13.0, carbs: 1.1,  fat: 11.0 },
  { id: 'egg_white',      emoji: '🥛', name: 'Clara de huevo',           category: 'Huevos y lácteos', gramsPerUnit: 33,   cookingFactor: 1.00, kcal: 52,  protein: 11.0, carbs: 0.7,  fat: 0.2  },
  { id: 'egg_yolk',       emoji: '🟡', name: 'Yema de huevo',            category: 'Huevos y lácteos', gramsPerUnit: 17,   cookingFactor: 1.00, kcal: 322, protein: 16.0, carbs: 3.6,  fat: 27.0 },
  { id: 'greek_yogurt',   emoji: '🫙', name: 'Yogur griego',             category: 'Huevos y lácteos', gramsPerUnit: null, cookingFactor: 1.00, kcal: 100, protein: 10.0, carbs: 4.0,  fat: 5.0  },
  { id: 'cottage_cheese', emoji: '🧀', name: 'Queso cottage',            category: 'Huevos y lácteos', gramsPerUnit: null, cookingFactor: 1.00, kcal: 98,  protein: 11.0, carbs: 3.4,  fat: 4.3  },

  // ── Frutas ───────────────────────────────────────────────────────────────
  { id: 'apple',          emoji: '🍎', name: 'Manzana',                  category: 'Frutas',            gramsPerUnit: 180,  cookingFactor: 1.00, kcal: 52,  protein: 0.3,  carbs: 14.0, fat: 0.2  },
  { id: 'banana',         emoji: '🍌', name: 'Banana',                   category: 'Frutas',            gramsPerUnit: 120,  cookingFactor: 1.00, kcal: 89,  protein: 1.1,  carbs: 23.0, fat: 0.3  },
  { id: 'orange',         emoji: '🍊', name: 'Naranja',                  category: 'Frutas',            gramsPerUnit: 200,  cookingFactor: 1.00, kcal: 47,  protein: 0.9,  carbs: 12.0, fat: 0.1  },
  { id: 'mixed_fruit',    emoji: '🍇', name: 'Fruta trozada (mix)',      category: 'Frutas',            gramsPerUnit: null, cookingFactor: 1.00, kcal: 60,  protein: 0.8,  carbs: 15.0, fat: 0.3  },

  // ── Frutos secos ─────────────────────────────────────────────────────────
  { id: 'walnuts',        emoji: '🥜', name: 'Nueces rubias',            category: 'Frutos secos',      gramsPerUnit: null, cookingFactor: 1.00, kcal: 654, protein: 15.0, carbs: 14.0, fat: 65.0 },
  { id: 'almonds',        emoji: '🌰', name: 'Almendras',                category: 'Frutos secos',      gramsPerUnit: null, cookingFactor: 1.00, kcal: 579, protein: 21.0, carbs: 22.0, fat: 50.0 },
  { id: 'cashews',        emoji: '🥜', name: 'Castañas de cajú',         category: 'Frutos secos',      gramsPerUnit: null, cookingFactor: 1.00, kcal: 553, protein: 18.0, carbs: 33.0, fat: 44.0 },

  // ── Condimentos ──────────────────────────────────────────────────────────
  { id: 'green_olives',   emoji: '🫒', name: 'Aceitunas verdes',         category: 'Condimentos',       gramsPerUnit: null, cookingFactor: 1.00, kcal: 145, protein: 1.0,  carbs: 3.8,  fat: 15.0 },
  { id: 'olive_oil',      emoji: '🫙', name: 'Aceite de oliva',          category: 'Condimentos',       gramsPerUnit: null, cookingFactor: 1.00, kcal: 884, protein: 0.0,  carbs: 0.0,  fat: 100.0 },
]

export const CATEGORIES = [...new Set(FOODS.map(f => f.category))]

export const CATEGORY_EMOJI = {
  'Carnes':              '🥩',
  'Pescados y mariscos': '🐟',
  'Cereales':            '🌾',
  'Legumbres':           '🫘',
  'Verduras':            '🥦',
  'Huevos y lácteos':   '🥚',
  'Frutas':              '🍎',
  'Frutos secos':        '🥜',
  'Condimentos':         '🫒',
}
