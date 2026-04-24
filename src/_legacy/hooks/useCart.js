import { useState } from 'react'
import { calcGramsPerDay } from '../utils/calculations'

export function useCart() {
  const [items, setItems] = useState([])
  const [boughtIds, setBoughtIds] = useState(new Set())

  function addItem(food, inputType, inputValue) {
    const gramsPerDay = calcGramsPerDay(food, inputType, Number(inputValue))
    if (gramsPerDay <= 0) return
    setItems(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        food,
        inputType,
        inputValue: Number(inputValue),
        gramsPerDay,
        meal: null,
      },
    ])
  }

  /**
   * Carga un plan completo reemplazando el carrito actual.
   * @param {Array} planDef  — array de { foodId, inputType, inputValue, meal }
   * @param {Array} allFoods — lista completa de alimentos (predefinidos + custom)
   */
  function loadPlan(planDef, allFoods) {
    const newItems = planDef
      .map(p => {
        const food = allFoods.find(f => f.id === p.foodId)
        if (!food) return null
        const gramsPerDay = calcGramsPerDay(food, p.inputType, Number(p.inputValue))
        if (gramsPerDay <= 0) return null
        return {
          id: crypto.randomUUID(),
          food,
          inputType: p.inputType,
          inputValue: Number(p.inputValue),
          gramsPerDay,
          meal: p.meal ?? null,
        }
      })
      .filter(Boolean)
    setItems(newItems)
    setBoughtIds(new Set())
  }

  function removeItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
    setBoughtIds(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function toggleBought(id) {
    setBoughtIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function clearCart() {
    setItems([])
    setBoughtIds(new Set())
  }

  return { items, boughtIds, addItem, removeItem, toggleBought, clearCart, loadPlan }
}
