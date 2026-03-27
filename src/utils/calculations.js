/**
 * Calcula los gramos por día a partir del input del usuario.
 * Si el input es por unidades, se multiplica por gramsPerUnit del alimento.
 */
export function calcGramsPerDay(food, inputType, inputValue) {
  if (!food || inputValue <= 0) return 0
  if (inputType === 'units') {
    return (food.gramsPerUnit ?? 0) * inputValue
  }
  return inputValue
}

/**
 * Devuelve los gramos crudos para N días.
 */
export function rawForDays(gramsPerDay, days) {
  return gramsPerDay * days
}

/**
 * Devuelve los gramos cocidos para N días.
 */
export function cookedForDays(gramsPerDay, days, cookingFactor) {
  return gramsPerDay * days * cookingFactor
}

/**
 * Formatea gramos: muestra kg si ≥ 1000 g.
 */
export function formatGrams(grams) {
  if (grams === 0) return '—'
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2).replace('.', ',')} kg`
  }
  return `${Math.round(grams)} g`
}

/**
 * Calcula los macros de un ítem del carrito por día.
 * Los valores nutricionales están definidos por 100g de alimento CRUDO.
 */
export function calcNutrition(item) {
  const { food, gramsPerDay } = item
  if (!food.kcal) return { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  const factor = gramsPerDay / 100
  return {
    kcal:    food.kcal    * factor,
    protein: food.protein * factor,
    carbs:   food.carbs   * factor,
    fat:     food.fat     * factor,
  }
}

/**
 * Suma los macros de todos los ítems del carrito.
 */
export function calcTotalNutrition(items) {
  return items.reduce(
    (acc, item) => {
      const n = calcNutrition(item)
      acc.kcal    += n.kcal
      acc.protein += n.protein
      acc.carbs   += n.carbs
      acc.fat     += n.fat
      return acc
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  )
}
