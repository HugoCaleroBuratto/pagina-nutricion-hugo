import { calcNutrition, calcTotalNutrition } from '../utils/calculations'

const DAILY_REF = { kcal: 2000, protein: 50, carbs: 275, fat: 78 } // referencias diarias orientativas

function MacroBar({ label, value, max, color, unit = 'g' }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className="font-semibold text-gray-700">{Math.round(value)}{unit}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-right text-xs text-gray-400">{Math.round(pct)}% ref. diaria</p>
    </div>
  )
}

export default function NutritionPanel({ items }) {
  if (items.length === 0) return null

  const totals = calcTotalNutrition(items)
  const totalMacroKcal = totals.protein * 4 + totals.carbs * 4 + totals.fat * 9

  const protPct  = totalMacroKcal > 0 ? Math.round((totals.protein * 4 / totalMacroKcal) * 100) : 0
  const carbsPct = totalMacroKcal > 0 ? Math.round((totals.carbs   * 4 / totalMacroKcal) * 100) : 0
  const fatPct   = totalMacroKcal > 0 ? Math.round((totals.fat     * 9 / totalMacroKcal) * 100) : 0

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden no-print">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-500 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Aporte energético diario</p>
            <p className="text-sky-100 text-xs mt-0.5">Valores en crudo por día</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sky-100 text-xs">Total</p>
          <p className="text-white font-extrabold text-3xl leading-none">
            {Math.round(totals.kcal)}
            <span className="text-sky-200 text-base font-normal ml-1">kcal</span>
          </p>
          <p className="text-sky-200 text-xs mt-0.5">{Math.round((totals.kcal / DAILY_REF.kcal) * 100)}% ref. {DAILY_REF.kcal} kcal</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Macro donut-style bar */}
        <div>
          <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">Distribución de macros</p>
          <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
            <div
              className="bg-blue-400 transition-all duration-700 flex items-center justify-center"
              style={{ width: `${protPct}%` }}
              title={`Proteínas ${protPct}%`}
            />
            <div
              className="bg-amber-400 transition-all duration-700"
              style={{ width: `${carbsPct}%` }}
              title={`Carbohidratos ${carbsPct}%`}
            />
            <div
              className="bg-rose-400 transition-all duration-700"
              style={{ width: `${fatPct}%` }}
              title={`Grasas ${fatPct}%`}
            />
          </div>
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400 inline-block" />Prot. {protPct}%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />Carbs {carbsPct}%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-rose-400 inline-block" />Grasas {fatPct}%</span>
          </div>
        </div>

        {/* Individual macro bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MacroBar label="🥩 Proteínas"      value={totals.protein} max={DAILY_REF.protein} color="bg-blue-400" />
          <MacroBar label="🌾 Carbohidratos"  value={totals.carbs}   max={DAILY_REF.carbs}   color="bg-amber-400" />
          <MacroBar label="🫒 Grasas"          value={totals.fat}     max={DAILY_REF.fat}     color="bg-rose-400" />
        </div>

        {/* Per food table */}
        <div>
          <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">Detalle por alimento</p>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full min-w-[420px] text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-3 py-2 text-left font-semibold text-gray-400">Alimento</th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-400">kcal</th>
                  <th className="px-3 py-2 text-right font-semibold text-blue-400">Prot.</th>
                  <th className="px-3 py-2 text-right font-semibold text-amber-400">Carbs</th>
                  <th className="px-3 py-2 text-right font-semibold text-rose-400">Grasas</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  const n = calcNutrition(item)
                  return (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2 flex items-center gap-1.5">
                        <span>{item.food.emoji || '🍽️'}</span>
                        <span className="text-gray-700 font-medium">{item.food.name}</span>
                      </td>
                      <td className="px-3 py-2 text-right font-semibold text-gray-700">{Math.round(n.kcal)}</td>
                      <td className="px-3 py-2 text-right text-blue-500">{n.protein.toFixed(1)}g</td>
                      <td className="px-3 py-2 text-right text-amber-500">{n.carbs.toFixed(1)}g</td>
                      <td className="px-3 py-2 text-right text-rose-500">{n.fat.toFixed(1)}g</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="bg-sky-50 border-t-2 border-sky-200 font-bold">
                  <td className="px-3 py-2 text-sky-700">⚡ TOTAL / DÍA</td>
                  <td className="px-3 py-2 text-right text-sky-700">{Math.round(totals.kcal)}</td>
                  <td className="px-3 py-2 text-right text-blue-600">{totals.protein.toFixed(1)}g</td>
                  <td className="px-3 py-2 text-right text-amber-600">{totals.carbs.toFixed(1)}g</td>
                  <td className="px-3 py-2 text-right text-rose-600">{totals.fat.toFixed(1)}g</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
