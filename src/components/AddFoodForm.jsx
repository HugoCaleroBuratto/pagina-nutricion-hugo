import { useState } from 'react'
import { ShoppingCart, Scale, Hash } from 'lucide-react'
import FoodSelector from './FoodSelector'

export default function AddFoodForm({ onAdd, onAddCustom, customFoods }) {
  const [selectedFood, setSelectedFood] = useState(null)
  const [inputType, setInputType] = useState('weight') // 'weight' | 'units'
  const [inputValue, setInputValue] = useState('')

  const gramsPreview = selectedFood && inputType === 'units' && inputValue
    ? selectedFood.gramsPerUnit * Number(inputValue)
    : null

  function handleSelect(food) {
    setSelectedFood(food)
    // If food has no gramsPerUnit, force weight mode
    if (!food.gramsPerUnit) setInputType('weight')
    setInputValue('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!selectedFood || !inputValue || Number(inputValue) <= 0) return
    onAdd(selectedFood, inputType, inputValue)
    setSelectedFood(null)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
      <h2 className="text-base font-bold text-gray-700 flex items-center gap-2">
        <span className="text-xl">🔍</span>
        Agregar alimento a la lista
      </h2>

      {/* Food selector */}
      <FoodSelector
        onSelect={handleSelect}
        onAddCustom={onAddCustom}
        customFoods={customFoods}
      />

      {selectedFood && (
        <div className="space-y-3">
          {/* Selected food chip */}
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-700 font-medium">
            <span className="text-lg">{selectedFood.emoji || '🍽️'}</span>
            <span className="truncate">{selectedFood.name}</span>
            <span className="text-xs text-emerald-400 shrink-0 ml-auto">
              🍳 ×{selectedFood.cookingFactor}
            </span>
          </div>

          {/* Weight / Units toggle */}
          {selectedFood.gramsPerUnit && (
            <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
              <button
                type="button"
                onClick={() => setInputType('weight')}
                className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${
                  inputType === 'weight'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                Gramos
              </button>
              <button
                type="button"
                onClick={() => setInputType('units')}
                className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${
                  inputType === 'units'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                Unidades
              </button>
            </div>
          )}

          {/* Quantity input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                min="0.1"
                step="any"
                placeholder={inputType === 'units' ? 'Cantidad de unidades' : 'Gramos por día'}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              {gramsPreview !== null && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  ≈ {Math.round(gramsPreview)}g
                </span>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all text-sm font-medium shrink-0 shadow-sm"
            >
              ➕ Agregar
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
