import {
  cookedForDays,
  rawForDays,
  formatGrams,
  calcNutrition,
  calcTotalNutrition,
} from '../utils/calculations'

const TH = 'px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-left'

export default function MealPlanView({ items }) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-14 text-center">
        <p className="text-4xl mb-3">🍽️</p>
        <p className="text-gray-400 text-sm font-medium">Cargá el plan primero</p>
        <p className="text-gray-300 text-xs mt-1">Usá el botón "Cargar mi plan" para ver las comidas</p>
      </div>
    )
  }

  // Group items by meal
  const mealMap = items.reduce((acc, item) => {
    const key = item.meal ?? 'Sin comida asignada'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  const mealEntries = Object.entries(mealMap)

  return (
    <div className="space-y-6">
      {/* ── Section A: Per meal ─────────────────────────────────────── */}
      {mealEntries.map(([mealName, mealItems]) => {
        const totals = calcTotalNutrition(mealItems)
        return (
          <div key={mealName} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
              <h3 className="text-sm font-bold text-emerald-800">{mealName}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className={`${TH} text-gray-500 w-44`}>Alimento</th>
                    <th className={`${TH} text-amber-600 text-center`}>Cocido / día</th>
                    <th className={`${TH} text-gray-500 text-center`}>Kcal</th>
                    <th className={`${TH} text-blue-500 text-center`}>Proteína</th>
                    <th className={`${TH} text-orange-500 text-center`}>Carbs</th>
                    <th className={`${TH} text-yellow-600 text-center`}>Grasas</th>
                  </tr>
                </thead>
                <tbody>
                  {mealItems.map(item => {
                    const cooked = cookedForDays(item.gramsPerDay, 1, item.food.cookingFactor)
                    const n = calcNutrition(item)
                    return (
                      <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-2.5 px-3 text-sm text-gray-700">
                          <span className="mr-1">{item.food.emoji || '🍽️'}</span>
                          {item.food.name}
                        </td>
                        <td className="py-2.5 px-3 text-sm text-center text-amber-700 font-medium tabular-nums">
                          {formatGrams(cooked)}
                        </td>
                        <td className="py-2.5 px-3 text-sm text-center text-gray-600 tabular-nums">
                          {Math.round(n.kcal)}
                        </td>
                        <td className="py-2.5 px-3 text-sm text-center text-blue-600 tabular-nums">
                          {n.protein.toFixed(1)} g
                        </td>
                        <td className="py-2.5 px-3 text-sm text-center text-orange-500 tabular-nums">
                          {n.carbs.toFixed(1)} g
                        </td>
                        <td className="py-2.5 px-3 text-sm text-center text-yellow-600 tabular-nums">
                          {n.fat.toFixed(1)} g
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gradient-to-r from-emerald-50 to-green-50 border-t-2 border-emerald-200 font-bold">
                    <td className="py-2.5 px-3 text-sm text-emerald-700">TOTAL comida</td>
                    <td className="py-2.5 px-3 text-sm text-center text-amber-600">—</td>
                    <td className="py-2.5 px-3 text-sm text-center text-gray-700 tabular-nums">
                      {Math.round(totals.kcal)}
                    </td>
                    <td className="py-2.5 px-3 text-sm text-center text-blue-600 tabular-nums">
                      {totals.protein.toFixed(1)} g
                    </td>
                    <td className="py-2.5 px-3 text-sm text-center text-orange-500 tabular-nums">
                      {totals.carbs.toFixed(1)} g
                    </td>
                    <td className="py-2.5 px-3 text-sm text-center text-yellow-600 tabular-nums">
                      {totals.fat.toFixed(1)} g
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )
      })}

      {/* ── Section B: Weekly raw summary ───────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-purple-50">
          <h3 className="text-sm font-bold text-violet-800">📦 Qué cocinar en la semana (crudo × 7 días)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className={`${TH} text-gray-500 w-44`}>Alimento</th>
                <th className={`${TH} text-gray-500 text-center`}>Crudo × 7 días</th>
                <th className={`${TH} text-gray-400 text-left`}>Comida</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-2.5 px-3 text-sm text-gray-700">
                    <span className="mr-1">{item.food.emoji || '🍽️'}</span>
                    {item.food.name}
                  </td>
                  <td className="py-2.5 px-3 text-sm text-center font-medium tabular-nums text-gray-700">
                    {formatGrams(rawForDays(item.gramsPerDay, 7))}
                  </td>
                  <td className="py-2.5 px-3 text-xs text-gray-400">
                    {item.meal ?? 'Sin comida asignada'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gradient-to-r from-violet-50 to-purple-50 border-t-2 border-violet-200 font-bold">
                <td className="py-2.5 px-3 text-sm text-violet-700">TOTAL semana</td>
                <td className="py-2.5 px-3 text-sm text-center text-gray-700 tabular-nums">
                  {formatGrams(items.reduce((sum, item) => sum + rawForDays(item.gramsPerDay, 7), 0))}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── Grand total macros ──────────────────────────────────────── */}
      {(() => {
        const grand = calcTotalNutrition(items)
        return (
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-md p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100 mb-3">
              Total diario (todas las comidas)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-extrabold tabular-nums">{Math.round(grand.kcal)}</p>
                <p className="text-xs text-emerald-100 mt-0.5">kcal</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold tabular-nums">{grand.protein.toFixed(1)} g</p>
                <p className="text-xs text-emerald-100 mt-0.5">proteína</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold tabular-nums">{grand.carbs.toFixed(1)} g</p>
                <p className="text-xs text-emerald-100 mt-0.5">carbs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold tabular-nums">{grand.fat.toFixed(1)} g</p>
                <p className="text-xs text-emerald-100 mt-0.5">grasas</p>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
