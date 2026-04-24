import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { FOODS, CATEGORIES, CATEGORY_EMOJI } from '../data/foods'

export default function FoodSelector({ onSelect, onAddCustom, customFoods = [] }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const allFoods = [...FOODS, ...customFoods]

  const filtered = query.trim()
    ? allFoods.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : allFoods

  const groupedCategories = CATEGORIES.concat(
    customFoods.map(f => f.category).filter(c => !CATEGORIES.includes(c))
  )

  const grouped = groupedCategories
    .map(cat => ({
      category: cat,
      foods: filtered.filter(f => f.category === cat),
    }))
    .filter(g => g.foods.length > 0)

  function handleSelect(food) {
    onSelect(food)
    setQuery('')
    setOpen(false)
  }

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar alimento... 🔎"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm"
        />
      </div>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-y-auto">
          {grouped.length === 0 && (
            <p className="px-4 py-3 text-sm text-gray-500">😕 Sin resultados</p>
          )}
          {grouped.map(({ category, foods }) => (
            <div key={category}>
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 flex items-center gap-1.5">
                <span>{CATEGORY_EMOJI[category] || '🍽️'}</span>
                {category}
              </div>
              {foods.map(food => (
                <button
                  key={food.id}
                  onClick={() => handleSelect(food)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex justify-between items-center gap-2"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{food.emoji || '🍽️'}</span>
                    {food.name}
                  </span>
                  {food.gramsPerUnit && (
                    <span className="text-xs text-gray-400 shrink-0">{food.gramsPerUnit}g/ud</span>
                  )}
                </button>
              ))}
            </div>
          ))}

          <div className="border-t border-gray-100">
            <button
              onClick={() => { setOpen(false); onAddCustom() }}
              className="w-full text-left px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 font-medium"
            >
              <span className="text-base">✨</span>
              Agregar alimento personalizado
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
